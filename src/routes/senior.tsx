import { createFileRoute } from "@tanstack/react-router";
import { SeniorApp } from "@/screens/senior";

export const Route = createFileRoute("/senior")({ component: SeniorApp });
