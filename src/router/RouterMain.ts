import { login, register, getUserById, updateUser, getUsers, getUserIdentity } from "../controllers/api/UserApi";
import {
    createArticle,
    deleteArticleById,
    updateArticle,
    getArticleByParams,
    getArticleById,
    createArticleType,
    updateArticleType,
    getArticleType,
    deleteArticleType,
    createArticleClass,
    updateArticleClass,
    getArticleClass
} from "../controllers/api/ArtilceApi";


class RouterMain {
    $app: any;
    apiBody: string = process.env.API_BODY;
    userBody: string = "/account";
    articleBody: string = "/article";
    constructor(app: any) {
        this.$app = app;
        this.userBody = this.apiBody + this.userBody;
        this.articleBody = this.apiBody + this.articleBody;
    }
    api() {
        this.$app.post(this.userBody + "/login", login);
        this.$app.post(this.userBody + "/register", register);
        this.$app.post(this.userBody + "/getUserById", getUserById);
        this.$app.post(this.userBody + "/updateUser", updateUser);
        this.$app.post(this.userBody + "/getUsers", getUsers);
        this.$app.post(this.userBody + "/getUserIdentity", getUserIdentity);

        this.$app.post(this.articleBody + "/createArticle", createArticle);
        this.$app.post(this.articleBody + "/deleteArticleById", deleteArticleById);
        this.$app.post(this.articleBody + "/updateArticle", updateArticle);
        this.$app.post(this.articleBody + "/getArticleByParams", getArticleByParams);
        this.$app.post(this.articleBody + "/getArticleById", getArticleById);
        this.$app.post(this.articleBody + "/createArticleType", createArticleType);
        this.$app.post(this.articleBody + "/updateArticleType", updateArticleType);
        this.$app.post(this.articleBody + "/getArticleType", getArticleType);
        this.$app.post(this.articleBody + "/deleteArticleType", deleteArticleType);
        this.$app.post(this.articleBody + "/createArticleClass", createArticleClass);
        this.$app.post(this.articleBody + "/updateArticleClass", updateArticleClass);
        this.$app.post(this.articleBody + "/getArticleClass", getArticleClass);
    }
}

export default RouterMain;