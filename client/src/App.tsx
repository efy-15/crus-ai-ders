import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </>
  );
}
