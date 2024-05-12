import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const PortfolioPage = () => {
  return (
    <div>
      <Link to="/profile">
        <Button>Profile</Button>
      </Link>
    </div>
  );
};

export default PortfolioPage;
