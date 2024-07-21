import NullComponent from "@/components/NullComponent";
import config from "@/config";
import EditBlog from "./Edit";

export default function Edit() {

    if (config.isProduction) return <NullComponent />;
    return <EditBlog />;
}