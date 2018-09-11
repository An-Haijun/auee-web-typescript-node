import utils from "./FormatData";

interface Map {
    success: boolean;
    error_code: number;
    error_msg: string;
    result: any;
    timestamp: string;
}
class JsonResult {
    constructoe() { }
    setMap(options: any) {
        if (!options) {
            console.error("params is not null");
            return;
        }
        const resolve: Map = {
            success: true,
            error_code: 0,
            error_msg: "",
            result: {},
            timestamp: ""
        };
        resolve.success = options.success || true;
        resolve.error_code = options.error_code || 0;
        resolve.error_msg = options.error_msg || "";
        options.result = options.result && this.__formatDate(options.result);
        resolve.result = resolve.result && options.result[0] || "";
        resolve.timestamp = utils.dateFormat().all;
        return resolve;
    }
    setLists(options: any) {
        if (!options) {
            console.error("params is not null");
            return;
        }
        const resolve: Map = {
            success: true,
            error_code: 0,
            error_msg: "",
            result: [],
            timestamp: ""
        };
        resolve.success = options.success || true;
        resolve.error_code = options.error_code || 0;
        resolve.error_msg = options.error_msg || "";
        resolve.result = options.result || [];
        resolve.result = resolve.result && this.__formatDate(resolve.result);
        resolve.timestamp = utils.dateFormat().all;
        return resolve;
    }
    setPaging(options: any) {
        if (!options) {
            console.error("params is not null");
            return;
        }
        const resolve: Map = {
            success: true,
            error_code: 0,
            error_msg: "",
            result: [],
            timestamp: ""
        };
        resolve.success = options.success || true;
        resolve.error_code = options.error_code || 0;
        resolve.error_msg = options.error_msg || "";
        resolve.result = {};
        if (options.result) {
            const lists = options.result[1];
            const total_count = options.result[0][0]["total_count"];
            let total_page: string = (total_count / options.page_size).toString();
            if (total_page.toString().indexOf(".") > 0) {
                total_page = (parseInt(total_page) + 1).toString();
            }
            resolve.result.list = lists;
            resolve.result.list = resolve.result.list && this.__formatDate(resolve.result.list);
            resolve.result.total_count = total_count;
            resolve.result.total_page = total_page;
            resolve.result.current_page = options.page;
            resolve.result.is_next = true;
            if (lists.length < options.page_size) {
                resolve.result.is_next = false;
            }
        } else {
            resolve.result = "";
        }
        resolve.timestamp = utils.dateFormat().all;
        return resolve;
    }
    error(options: any = {}) {
        const resolve: Map = {
            success: false,
            error_code: 1,
            error_msg: "系统异常",
            result: "",
            timestamp: ""
        };
        if (options) {
            resolve.success = options.success || false;
            resolve.error_code = options.error_code || 1;
            resolve.error_msg = options.error_msg || "系统异常";
        }
        resolve.timestamp = utils.dateFormat().all;
        return resolve;
    }
    private __formatDate(items: any) {
        if (items && items.length != 0) {
            const length = items.length;
            for (let i = 0; i < length; i++) {
                items[i].create_at = utils.dateFormat(items[i].create_at).all;
                items[i].update_at = utils.dateFormat(items[i].update_at).all;
                if (items[i].is_delete == "0") {
                    items[i].is_delete = false;
                } else {
                    items[i].is_delete = true;
                }
            }
            return items;
        } else {
            return items;
        }
    }
}

const jsonResult = new JsonResult();

export default jsonResult;