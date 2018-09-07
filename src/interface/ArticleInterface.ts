interface ArticleInterface {
    article_id: number;
    title: string;
    content: string;
    markdown_content: string;
    user_id: number;
    like_number: number;
    comment_number: number;
    article_state: string;
    is_delete: boolean;
    article_class_id: number;
    article_type_id: number;
    article_tag: string;
    create_at: string;
    update_at: string;
}

export = ArticleInterface;