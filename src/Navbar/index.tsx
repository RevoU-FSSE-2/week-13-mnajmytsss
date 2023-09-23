import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: "NUTSME",
    key: "/",
  },
];

const Navbar = () => {
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return <Menu onClick={onClick} items={items} mode={"horizontal"} style={{backgroundColor: '#0079FF'}} />;
};

export default Navbar;
