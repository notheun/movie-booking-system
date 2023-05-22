import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function HomeNavbar() {
  return (
    <>
      <div class="topnav">
        <Link className="wordings">Movies</Link>
        <Link className="wordings">F&B</Link>
        <Link className="wordings">Redeem Rewards</Link>
        <Link className="wordings toLeft">
          <div className="toLeft">
            <ShoppingCartOutlinedIcon />
          </div>
        </Link>
      </div>
    </>
  );
}
