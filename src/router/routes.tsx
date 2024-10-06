import {
    AppstoreOutlined,
    TagsOutlined,
    ProductOutlined,
    SettingOutlined,
    KubernetesOutlined,
    StockOutlined
  } from "@ant-design/icons";

  export const routes = [
    {
      title: "Products",
      path: "/main",
      icon: <ProductOutlined style={{fontSize: "22px"}}/>,
    },
    {
      title: "Categories",
      path: "/main/categories",
      icon: <AppstoreOutlined style={{fontSize: "22px"}}/>,
    },
    {
      title: "Brands",
      path: "/main/brands",
      icon: <TagsOutlined style={{fontSize: "22px"}}/>,
    },
    {
      title: "Brand Categories",
      path: "/main/brand-categories",
      icon: <AppstoreOutlined style={{fontSize: "22px"}}/>,
    },
    {
      title: "Ads",
      path: "/main/ads",
      icon: <KubernetesOutlined style={{fontSize: "22px"}}/>,
    },
    {
      title: "Stock",
      path: "/main/stock",
      icon: <StockOutlined style={{fontSize: "22px"}}/>,
    },
    {
      title: "Setting",
      path: "/main/setting",
      icon: <SettingOutlined style={{fontSize: "22px"}}/>,
    },
  ];