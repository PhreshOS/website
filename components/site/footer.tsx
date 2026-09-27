import Image from "next/image"
import { Flex } from "@phreshos/react-ui"
import { site } from "./links"
import logo from "./logo.png"

export default function Footer() {
  return <footer className="footer">
    <Flex align="center" gap="small">
      <Image src={logo} alt="" width={22} height={22} />
      <span>PhreshOS</span>
    </Flex>
    <span className="muted">Open source under the MIT License.</span>
    <Flex gap="medium">
      <a href={site.documentation}>Documentation</a>
      <a href={site.source}>GitHub</a>
    </Flex>
  </footer>
}
