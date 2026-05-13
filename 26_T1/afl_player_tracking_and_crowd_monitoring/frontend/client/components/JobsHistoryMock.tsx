import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, FileVideo, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

// Mock job history data.
// This is used until the backend /jobs?page=&limit= endpoint is connected.
const mockJobs = [
  {
    job_id: "job-001",
    file_name: "match_analysis_round_1.mp4",
    status: "done",
    created_at: "2026-04-08T09:15:00Z",
    updated_at: "2026-04-08T09:18:00Z",
  },
  {
    job_id: "job-002",
    file_name: "crowd_monitoring_mcg.mp4",
    status: "processing",
    created_at: "2026-04-08T10:05:00Z",
    updated_at: "2026-04-08T10:06:00Z",
  },
  {
    job_id: "job-003",
    file_name: "player_tracking_test.mov",
    status: "partial",
    created_at: "2026-04-08T11:30:00Z",
    updated_at: "2026-04-08T11:34:00Z",
  },
  {
    job_id: "job-004",
    file_name: "stadium_entry_flow.avi",
    status: "failed",
    created_at: "2026-04-08T12:20:00Z",
    updated_at: "2026-04-08T12:22:00Z",
  },
  {
    job_id: "job-005",
    file_name: "round_2_video_analysis.mp4",
    status: "done",
    created_at: "2026-04-09T08:10:00Z",
    updated_at: "2026-04-09T08:13:00Z",
  },
  {
    job_id: "job-006",
    file_name: "western_stand_density.mp4",
    status: "done",
    created_at: "2026-04-09T09:40:00Z",
    updated_at: "2026-04-09T09:45:00Z",
  },
  {
    job_id: "job-007",
    file_name: "player_heatmap_test.mov",
    status: "processing",
    created_at: "2026-04-09T10:25:00Z",
    updated_at: "2026-04-09T10:26:00Z",
  },
  {
    job_id: "job-008",
    file_name: "crowd_exit_time_analysis.mp4",
    status: "partial",
    created_at: "2026-04-09T11:15:00Z",
    updated_at: "2026-04-09T11:18:00Z",
  },
  {
    job_id: "job-009",
    file_name: "afl_player_detection_sample.mp4",
    status: "done",
    created_at: "2026-04-09T12:00:00Z",
    updated_at: "2026-04-09T12:03:00Z",
  },
  {
    job_id: "job-010",
    file_name: "crowd_monitoring_test_2.avi",
    status: "failed",
    created_at: "2026-04-09T13:30:00Z",
    updated_at: "2026-04-09T13:32:00Z",
  },
  {
    job_id: "job-011",
    file_name: "round_3_match_tracking.mp4",
    status: "done",
    created_at: "2026-04-10T08:45:00Z",
    updated_at: "2026-04-10T08:49:00Z",
  },
  {
    job_id: "job-012",
    file_name: "stadium_capacity_monitoring.mp4",
    status: "processing",
    created_at: "2026-04-10T09:20:00Z",
    updated_at: "2026-04-10T09:21:00Z",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "done":
      return "bg-green-100 text-green-700";
    case "processing":
      return "bg-blue-100 text-blue-700";
    case "partial":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "done":
      return <CheckCircle className="w-4 h-4" />;
    case "processing":
      return <Clock className="w-4 h-4" />;
    case "partial":
      return <AlertTriangle className="w-4 h-4" />;
    case "failed":
      return <XCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export default function JobsHistoryMock() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Mock version of backend response total.
  // When backend is connected, this will come from the API response.
  const total = mockJobs.length;

  // Main task requirement:
  // Calculate total pages using Math.ceil(total / limit).
  const totalPages = Math.ceil(total / limit);

  // Mock pagination using page + limit.
  // When backend is connected, replace this with GET /jobs?page=${page}&limit=${limit}.
  const paginatedJobs = mockJobs.slice(
    (page - 1) * limit,
    page * limit,
  );

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="flex items-center gap-2">
            <FileVideo className="w-5 h-5" />
            Jobs History
          </CardTitle>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Limit</span>
            <Select value={String(limit)} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {paginatedJobs.map((job) => (
            <div
              key={job.job_id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
            >
              <div>
                <h4 className="font-medium">{job.file_name}</h4>
                <p className="text-sm text-gray-600">Job ID: {job.job_id}</p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(job.created_at).toLocaleString()}
                </p>
              </div>

              <Badge className={`flex items-center gap-1 w-fit ${getStatusStyle(job.status)}`}>
                {getStatusIcon(job.status)}
                {job.status}
              </Badge>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t pt-4">
          <p className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1}-
            {Math.min(page * limit, total)} of {total} jobs
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((currentPage) => currentPage - 1)}
            >
              Previous
            </Button>

            <span className="text-sm font-medium">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((currentPage) => currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
