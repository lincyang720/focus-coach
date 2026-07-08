"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock3, FileText, Sparkles, Target } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createLocalWeeklyReport,
  getCurrentUser,
  getLocalReports,
  getLocalSessions
} from "@/lib/storage";
import type { WeeklyReport } from "@/lib/types";
import { formatDuration, getMonday, toDateInputValue } from "@/lib/utils";

export default function ReportsPage() {
  const [reports, setReports] = useState<WeeklyReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setReports(getLocalReports());
    void loadWeeklyReport();
  }, []);

  async function loadWeeklyReport() {
    const user = getCurrentUser();
    const weekStart = toDateInputValue(getMonday());
    const response = await fetch(
      `/api/reports/weekly?userId=${encodeURIComponent(user.id)}&weekStart=${weekStart}`
    ).catch(() => null);

    if (!response?.ok) return;
    const result = await response.json();
    if (result.report) {
      setReports([result.report]);
    }
  }

  async function generateReport() {
    setLoading(true);
    setMessage("");
    const user = getCurrentUser();
    const weekStart = toDateInputValue(getMonday());

    try {
      const response = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, weekStart })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Unable to generate AI report");
      }

      const reportResponse = await fetch(
        `/api/reports/weekly?userId=${encodeURIComponent(user.id)}&weekStart=${weekStart}`
      );
      const reportResult = await reportResponse.json();

      if (reportResult.report) {
        setReports([reportResult.report]);
        setMessage("Your weekly focus training report is ready.");
        return;
      }

      throw new Error("Unable to load the weekly report");
    } catch (error) {
      const report = createLocalWeeklyReport(getLocalSessions());
      setReports(
        getLocalReports()
          .filter((item) => item.weekStartDate !== report.weekStartDate)
          .concat(report)
      );
      setMessage("We could not save the report right now, so a local report is shown instead.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Badge>Pro preview</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-normal">
              AI Weekly Focus Training Report
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Generate a weekly recap from your focus training data and store it with your account.
            </p>
            <h2 className="mt-6 text-2xl font-semibold tracking-normal">
              AI productivity insights from focus training data
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Weekly reports summarize sessions, accuracy, time, and practical next steps without
              medical claims.
            </p>
          </div>
          <Button onClick={generateReport} disabled={loading}>
            <Sparkles className="h-4 w-4" aria-hidden />
            {loading ? "Generating..." : "Generate AI report"}
          </Button>
        </div>
        {message ? (
          <div className="rounded-md border bg-background/80 p-4 text-sm text-muted-foreground">
            {message}
          </div>
        ) : null}

        {reports.length === 0 ? (
          <Card className="bg-background/92 backdrop-blur">
            <CardContent className="flex flex-col items-center p-10 text-center">
              <FileText className="h-10 w-10 text-primary" aria-hidden />
              <p className="mt-4 font-medium">No reports yet</p>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Complete a few sessions, then generate this week&apos;s recap.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {[...reports].reverse().map((report) => (
              <Card key={report.weekStartDate} className="bg-background/92 backdrop-blur">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CardTitle>
                      Week of {new Date(report.weekStartDate).toLocaleDateString()}
                    </CardTitle>
                    <Badge>{report.totalSessions} sessions</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 md:grid-cols-3">
                    <Metric
                      icon="time"
                      label="Training time"
                      tone="blue"
                      value={formatDuration(report.totalDurationSeconds)}
                    />
                    <Metric
                      icon="accuracy"
                      label="Accuracy"
                      tone="green"
                      value={`${(report.averageAccuracy * 100).toFixed(1)}%`}
                    />
                    <Metric
                      icon="window"
                      label="Report window"
                      tone="amber"
                      value={`${report.weekStartDate} to ${report.weekEndDate}`}
                    />
                  </div>
                  <div className="rounded-md border border-primary/15 bg-primary/5 p-4">
                    <div className="space-y-3 leading-7 text-muted-foreground">
                      {renderHighlightedReport(report.reportContent)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

function Metric({
  icon,
  label,
  tone,
  value
}: {
  icon: "time" | "accuracy" | "window";
  label: string;
  tone: "blue" | "green" | "amber";
  value: string;
}) {
  const Icon = icon === "time" ? Clock3 : icon === "accuracy" ? Target : CalendarDays;
  const toneClass =
    tone === "green"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : tone === "amber"
        ? "border-amber-200 bg-amber-50 text-amber-900"
        : "border-sky-200 bg-sky-50 text-sky-900";

  return (
    <div className={`rounded-md border p-4 ${toneClass}`}>
      <div className="flex items-center gap-2 text-sm font-medium">
        <Icon className="h-4 w-4" aria-hidden />
        <span>{label}</span>
      </div>
      <p className="mt-2 break-words text-xl font-semibold tracking-normal">{value}</p>
    </div>
  );
}

function renderHighlightedReport(content: string) {
  return content.split(/\n+/).map((line, lineIndex) => (
    <p key={`${line}-${lineIndex}`}>{highlightReportLine(line)}</p>
  ));
}

function highlightReportLine(line: string) {
  const pattern =
    /(under 1 minute|less than 1 minute|\b\d+(?:\.\d+)?%?\b|Number Memory|Quick Match|N-Back|Task Switch|Stroop Test|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/g;

  return line.split(pattern).map((part, index) => {
    if (!part.match(pattern)) return part;
    return (
      <span
        key={`${part}-${index}`}
        className="rounded-sm bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-950"
      >
        {part}
      </span>
    );
  });
}
