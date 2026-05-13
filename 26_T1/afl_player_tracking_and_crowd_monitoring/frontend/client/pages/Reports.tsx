import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import MobileNavigation from "@/components/MobileNavigation";
import LiveClock from "@/components/LiveClock";
import {
  Download,
  FileText,
  Trophy,
  User,
  Users,
  Target,
  Video,
  BarChart3,
  Calendar,
  Filter,
  Search,
  Eye,
  Trash2,
  Share2,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { downloadText } from "@/lib/download";

// Mock data for reports
const availableReports = [
  {
    id: 1,
    name: "Weekly Performance Summary - Round 15",
    type: "Performance Report",
    category: "Player Analysis",
    date: "2024-01-15",
    size: "2.4 MB",
    format: "PDF",
    teams: "Carlton vs Adelaide",
    status: "ready",
    downloads: 23,
    created: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Crowd Density Analysis - MCG",
    type: "Crowd Report",
    category: "Crowd Monitoring",
    date: "2024-01-14",
    size: "1.8 MB",
    format: "Excel",
    teams: "Melbourne vs Richmond",
    status: "ready",
    downloads: 15,
    created: "2024-01-14T16:45:00Z",
  },
  {
    id: 3,
    name: "Season Tactical Analysis",
    type: "Tactical Report",
    category: "Video Analysis",
    date: "2024-01-12",
    size: "5.2 MB",
    format: "PDF",
    teams: "Multi-team Analysis",
    status: "ready",
    downloads: 45,
    created: "2024-01-12T09:15:00Z",
  },
  {
    id: 4,
    name: "Player Comparison - Top 50",
    type: "Comparison Report",
    category: "Player Analysis",
    date: "2024-01-10",
    size: "3.1 MB",
    format: "CSV",
    teams: "League-wide",
    status: "processing",
    downloads: 0,
    created: "2024-01-10T14:20:00Z",
  },
  {
    id: 5,
    name: "Video Highlights Compilation",
    type: "Video Package",
    category: "Video Analysis",
    date: "2024-01-08",
    size: "156 MB",
    format: "MP4",
    teams: "Round 14 Highlights",
    status: "ready",
    downloads: 67,
    created: "2024-01-08T11:00:00Z",
  },
  {
    id: 6,
    name: "Match Day Safety Report",
    type: "Safety Report",
    category: "Crowd Monitoring",
    date: "2024-01-07",
    size: "0.8 MB",
    format: "JSON",
    teams: "Stadium Safety Analysis",
    status: "ready",
    downloads: 8,
    created: "2024-01-07T20:30:00Z",
  },

  
];

// Mock data for Jobs History.
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

const getJobStatusStyle = (status: string) => {
  switch (status) {
    case "done":
      return "bg-green-100 text-green-700 hover:bg-green-100";
    case "processing":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100";
    case "partial":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
    case "failed":
      return "bg-red-100 text-red-700 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";
  }
};

const getJobStatusIcon = (status: string) => {
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

export default function Reports() {
  const [isLive, setIsLive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [reportType, setReportType] = useState("player");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [jobsPage, setJobsPage] = useState(1);
  const [jobsLimit, setJobsLimit] = useState(5);

  const filteredReports = availableReports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.teams.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || report.category === selectedCategory;
    const matchesFormat =
      selectedFormat === "all" ||
      report.format.toLowerCase() === selectedFormat.toLowerCase();
    const matchesStatus =
      selectedStatus === "all" || report.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesFormat && matchesStatus;
  });

  // Mock pagination for Jobs History.
  // Later, this logic can be replaced with:
  // GET /jobs?page=${jobsPage}&limit=${jobsLimit}
  const jobsTotal = mockJobs.length;
  const jobsTotalPages = Math.ceil(jobsTotal / jobsLimit);
  const paginatedJobs = mockJobs.slice(
    (jobsPage - 1) * jobsLimit,
    jobsPage * jobsLimit,
  );

  const handleJobsLimitChange = (value: string) => {
    setJobsLimit(Number(value));
    setJobsPage(1);
  };

  const generateNewReport = async () => {
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate actual downloadable content
    let content: string;
    let mimeType: string;
    let extension: string;

    const reportData = {
      reportType,
      generatedOn: new Date().toISOString(),
      summary: {
        totalPlayers: 150,
        totalMatches: 24,
        avgAttendance: 47326,
        keyInsights: [
          "Player efficiency has increased by 3.2% this season",
          "Crowd density peaks at 2:45 PM before match start",
          "Video analysis shows 15% improvement in defensive tactics",
        ],
      },
      data: availableReports,
    };

    switch (reportFormat) {
      case "json":
        content = JSON.stringify(reportData, null, 2);
        mimeType = "application/json";
        extension = "json";
        break;

      case "csv":
        const csvHeader =
          "Report Name,Type,Category,Date,Size,Format,Status,Downloads\n";
        const csvData = availableReports
          .map(
            (report) =>
              `"${report.name}","${report.type}","${report.category}","${report.date}","${report.size}","${report.format}","${report.status}",${report.downloads}`,
          )
          .join("\n");
        content = csvHeader + csvData;
        mimeType = "text/csv";
        extension = "csv";
        break;

      default: // PDF (as text)
        content = `AFL Analytics Report - ${reportType.toUpperCase()}

Generated on: ${new Date().toLocaleString()}

EXECUTIVE SUMMARY
================
Total Players Analyzed: ${reportData.summary.totalPlayers}
Total Matches: ${reportData.summary.totalMatches}
Average Attendance: ${reportData.summary.avgAttendance.toLocaleString()}

KEY INSIGHTS
============
${reportData.summary.keyInsights.map((insight, i) => `${i + 1}. ${insight}`).join("\n")}

REPORT DETAILS
==============
${availableReports
  .map(
    (report) =>
      `${report.name}
  - Type: ${report.type}
  - Category: ${report.category}
  - Date: ${report.date}
  - Status: ${report.status}
  - Downloads: ${report.downloads}
`,
  )
  .join("\n")}

This report was generated by AFL Analytics Platform.`;
        mimeType = "text/plain";
        extension = "txt";
    }

    // Create and download the file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `AFL_${reportType}_Report_${Date.now()}.${extension}`;
    a.style.display = "none";

    try {
      document.body.appendChild(a);
      a.click();
    } finally {
      // Safely remove the element
      if (a.parentNode) {
        a.parentNode.removeChild(a);
      }
      URL.revokeObjectURL(url);
    }
  };

  const downloadReport = (report: (typeof availableReports)[0]) => {
    try {
      // Generate report content
      const content = `AFL Analytics Report: ${report.name}

Report Type: ${report.type}
Category: ${report.category}
Generated: ${report.date}
Teams: ${report.teams}
Format: ${report.format}
Size: ${report.size}

This is a sample report generated by AFL Analytics Platform.
In a real implementation, this would contain the actual report data.

Report Details:
- Created: ${new Date(report.created).toLocaleString()}
- Downloads: ${report.downloads}
- Status: ${report.status}

ANALYSIS SUMMARY:
- Match events tracked: ${Math.floor(Math.random() * 50 + 20)}
- Key moments identified: ${Math.floor(Math.random() * 15 + 5)}
- Player statistics collected: ${Math.floor(Math.random() * 22 + 18)}
- Performance metrics analyzed: ${Math.floor(Math.random() * 10 + 5)}

Thank you for using AFL Analytics Platform.
`;

      // Use safe download utility
      const fileName = `${report.name.replace(/[^a-z0-9]/gi, "_")}_${report.id}`;
      downloadText(content, fileName);

      console.log(`Downloaded report: ${report.name}`);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <MobileNavigation />

      <div className="lg:ml-64 pb-16 lg:pb-0">
        <div className="p-4 space-y-4">
          <LiveClock
            isLive={isLive}
            onToggleLive={setIsLive}
            matchTime={{ quarter: 2, timeRemaining: "15:23" }}
          />

          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="browse" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Browse Reports
              </TabsTrigger>
              <TabsTrigger value="generate" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Generate New
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Jobs History
              </TabsTrigger>
            </TabsList>

            {/* Browse Reports Tab */}
            <TabsContent value="browse" className="space-y-4">
              {/* Filters and Search */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filter & Search Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="search">Search Reports</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="search"
                          placeholder="Search by name or teams..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="Player Analysis">
                            Player Analysis
                          </SelectItem>
                          <SelectItem value="Crowd Monitoring">
                            Crowd Monitoring
                          </SelectItem>
                          <SelectItem value="Video Analysis">
                            Video Analysis
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Format</Label>
                      <Select
                        value={selectedFormat}
                        onValueChange={setSelectedFormat}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Formats</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="mp4">MP4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={selectedStatus}
                        onValueChange={setSelectedStatus}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reports Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReports.map((report) => (
                  <Card
                    key={report.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-6 mb-2">
                            {report.name}
                          </CardTitle>
                          <CardDescription>{report.teams}</CardDescription>
                        </div>
                        <Badge
                          variant={
                            report.status === "ready" ? "default" : "secondary"
                          }
                          className="ml-2"
                        >
                          {report.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <div className="font-medium">{report.type}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Category:</span>
                          <div className="font-medium">{report.category}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Date:</span>
                          <div className="font-medium">{report.date}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Format:</span>
                          <div className="font-medium">{report.format}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Size:</span>
                          <div className="font-medium">{report.size}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Downloads:</span>
                          <div className="font-medium">{report.downloads}</div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex gap-2">
                        {report.status === "ready" ? (
                          <>
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => downloadReport(report)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" className="flex-1" disabled>
                            Processing...
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredReports.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Reports Found
                    </h3>
                    <p className="text-gray-600">
                      No reports match your current filter criteria. Try
                      adjusting your filters or generate a new report.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Generate New Report Tab */}
            <TabsContent value="generate" className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Quick Report Generation
                    </CardTitle>
                    <CardDescription>
                      Generate commonly used reports with one click
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => {
                          setReportType("player_performance");
                          setReportFormat("pdf");
                          generateNewReport();
                        }}
                        className="flex items-center gap-2 h-auto p-4 flex-col"
                      >
                        <User className="w-6 h-6" />
                        <span className="text-center">
                          Player Performance
                          <br />
                          <small>(PDF)</small>
                        </span>
                      </Button>
                      <Button
                        onClick={() => {
                          setReportType("crowd_analysis");
                          setReportFormat("csv");
                          generateNewReport();
                        }}
                        variant="outline"
                        className="flex items-center gap-2 h-auto p-4 flex-col"
                      >
                        <Users className="w-6 h-6" />
                        <span className="text-center">
                          Crowd Analysis
                          <br />
                          <small>(CSV)</small>
                        </span>
                      </Button>
                      <Button
                        onClick={() => {
                          setReportType("tactical_review");
                          setReportFormat("json");
                          generateNewReport();
                        }}
                        variant="outline"
                        className="flex items-center gap-2 h-auto p-4 flex-col"
                      >
                        <Target className="w-6 h-6" />
                        <span className="text-center">
                          Tactical Review
                          <br />
                          <small>(JSON)</small>
                        </span>
                      </Button>
                      <Button
                        onClick={() => {
                          setReportType("video_highlights");
                          setReportFormat("pdf");
                          generateNewReport();
                        }}
                        variant="outline"
                        className="flex items-center gap-2 h-auto p-4 flex-col"
                      >
                        <Video className="w-6 h-6" />
                        <span className="text-center">
                          Video Highlights
                          <br />
                          <small>(PDF)</small>
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Custom Report Builder
                    </CardTitle>
                    <CardDescription>
                      Create a customized report with specific parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <Label>Report Type</Label>
                        <Select
                          value={reportType}
                          onValueChange={setReportType}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="player">
                              Player Analysis
                            </SelectItem>
                            <SelectItem value="team">
                              Team Performance
                            </SelectItem>
                            <SelectItem value="crowd">
                              Crowd Analytics
                            </SelectItem>
                            <SelectItem value="tactical">
                              Tactical Review
                            </SelectItem>
                            <SelectItem value="video">
                              Video Analysis
                            </SelectItem>
                            <SelectItem value="season">
                              Season Summary
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Output Format</Label>
                        <Select
                          value={reportFormat}
                          onValueChange={setReportFormat}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF Report</SelectItem>
                            <SelectItem value="csv">CSV Data</SelectItem>
                            <SelectItem value="json">JSON Data</SelectItem>
                            <SelectItem value="txt">Text Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Include Sections</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "Executive Summary",
                            "Statistical Analysis",
                            "Performance Trends",
                            "Comparative Data",
                            "Recommendations",
                            "Raw Data Export",
                          ].map((section) => (
                            <label
                              key={section}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                defaultChecked
                                className="rounded"
                              />
                              <span className="text-sm">{section}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <Button
                        onClick={generateNewReport}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Generate Custom Report ({reportFormat.toUpperCase()})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Jobs History Tab */}
            <TabsContent value="jobs" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Jobs History
                      </CardTitle>
                      <CardDescription>
                        Mock job history pagination using page and limit values.
                      </CardDescription>
                    </div>

                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-gray-600">
                        Jobs per page
                      </Label>
                      <Select
                        value={String(jobsLimit)}
                        onValueChange={handleJobsLimitChange}
                      >
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
                          <p className="text-sm text-gray-600">
                            Job ID: {job.job_id}
                          </p>
                          <p className="text-xs text-gray-500">
                            Created: {new Date(job.created_at).toLocaleString()}
                          </p>
                        </div>

                        <Badge
                          className={`flex items-center gap-1 w-fit ${getJobStatusStyle(
                            job.status,
                          )}`}
                        >
                          {getJobStatusIcon(job.status)}
                          {job.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-gray-600">
                      Showing {(jobsPage - 1) * jobsLimit + 1}-
                      {Math.min(jobsPage * jobsLimit, jobsTotal)} of{" "}
                      {jobsTotal} jobs
                    </p>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={jobsPage === 1}
                        onClick={() =>
                          setJobsPage((currentPage) => currentPage - 1)
                        }
                      >
                        Previous
                      </Button>

                      <span className="text-sm font-medium">
                        Page {jobsPage} of {jobsTotalPages}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        disabled={jobsPage === jobsTotalPages}
                        onClick={() =>
                          setJobsPage((currentPage) => currentPage + 1)
                        }
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}
