import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createRootRoute({
  component: () => (
    <>
      <button className="p-2 flex gap-2">
        <Link to="/">Logout</Link>{" "}
      </button>
      <hr />
    </>
  ),
});
