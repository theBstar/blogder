import NullComponent from "@/components/NullComponent";
import config from "@/config";
import CreateBlog from "./Create";

export default function Create() {

    if (config.isProduction) return <NullComponent />;
    return <CreateBlog />;
}