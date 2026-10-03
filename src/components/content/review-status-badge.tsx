import { BadgeCheck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ReviewStatus } from "@/types";

export function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  if (status === "clinically-reviewed") {
    return (
      <Badge variant="success">
        <BadgeCheck aria-hidden /> Clinically reviewed
      </Badge>
    );
  }
  return (
    <Badge variant="warning">
      <Clock aria-hidden /> {status === "draft" ? "Draft" : "Pending clinical review"}
    </Badge>
  );
}
