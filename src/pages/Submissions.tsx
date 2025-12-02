import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Card } from "primereact/card";
import { kycService } from "../services/kycService";
import type { KycSubmissionData } from "../models/kyc";
import { useToast } from "../contexts/ToastContext";

const Submissions = () => {
  const [submissions, setSubmissions] = useState<KycSubmissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await kycService.getAllSubmissions();
        const sortedData = response.data.sort(
          (a: KycSubmissionData, b: KycSubmissionData) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA;
          },
        );
        setSubmissions(sortedData);
      } catch (error) {
        console.error("Failed to fetch submissions", error);
        showToast("error", "Error", "Could not load submissions");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [showToast]);

  const handleAction = async (id: number, status: "approved" | "rejected") => {
    try {
      await kycService.updateStatus(id, status);

      setSubmissions((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: status } : item,
        ),
      );

      showToast(
        status === "approved" ? "success" : "warn",
        "Success",
        `KYC request ${status} successfully`,
      );
    } catch {
      showToast("error", "Error", "Failed to update status");
    }
  };

  const nameBodyTemplate = (rowData: KycSubmissionData) => {
    return (
      <span className="font-medium text-gray-900">
        {rowData.basicInfo?.firstName} {rowData.basicInfo?.lastName}
      </span>
    );
  };

  const statusBodyTemplate = (rowData: KycSubmissionData) => {
    const getSeverity = (status?: string) => {
      switch (status) {
        case "approved":
          return "success";
        case "rejected":
          return "danger";
        default:
          return "warning";
      }
    };

    const getValue = (status?: string) => {
      switch (status) {
        case "approved":
          return "Active";
        case "rejected":
          return "Inactive";
        default:
          return "Pending";
      }
    };

    return (
      <Tag
        value={getValue(rowData.status)}
        severity={getSeverity(rowData.status)}
        className="rounded-full px-3 py-1"
      />
    );
  };

  const actionBodyTemplate = (rowData: KycSubmissionData) => {
    return (
      <div className="flex gap-2">
        <Button
          label="Approve"
          size="small"
          severity="success"
          outlined
          className="text-xs font-bold"
          onClick={() => handleAction(rowData.id, "approved")}
          disabled={rowData.status === "approved"}
        />
        <Button
          label="Reject"
          size="small"
          severity="danger"
          outlined
          className="text-xs font-bold"
          onClick={() => handleAction(rowData.id, "rejected")}
          disabled={rowData.status === "rejected"}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="text-xl font-bold text-gray-900">KYC Submissions</span>
      <Button
        icon="pi pi-refresh"
        rounded
        raised
        onClick={() => window.location.reload()}
      />
    </div>
  );

  return (
    <div className="min-h-screen px-4 pt-4 pb-10">
      {" "}
      <div className="mx-auto max-w-7xl">
        <Card className="border border-gray-200 px-4 py-4 shadow-sm">
          <DataTable
            value={submissions}
            loading={loading}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            header={header}
            tableStyle={{ minWidth: "50rem" }}
            emptyMessage="No submissions found."
            className="p-datatable-sm"
          >
            <Column
              header="NAME"
              body={nameBodyTemplate}
              sortable
              field="basicInfo.firstName"
              style={{ width: "25%" }}
            ></Column>

            <Column
              header="STATUS"
              body={statusBodyTemplate}
              field="status"
              sortable
              style={{ width: "20%" }}
            ></Column>

            <Column
              field="createdAt"
              header="DATE"
              sortable
              body={(row) => {
                if (!row.createdAt) return "-";

                return new Date(row.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
              }}
              style={{ width: "20%" }}
            ></Column>

            <Column
              header="ACTIONS"
              body={actionBodyTemplate}
              style={{ width: "35%" }}
            ></Column>
          </DataTable>
        </Card>
      </div>
    </div>
  );
};

export default Submissions;
