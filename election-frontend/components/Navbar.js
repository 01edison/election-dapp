import Link from "next/link";
import { ConnectButton } from "@web3uikit/web3";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">
        <a className="nav-title">E-Voting Page</a>
      </Link>
      <ConnectButton moralisAuth={false} />
    </nav>
  );
}
