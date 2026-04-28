CREATE TYPE "public"."article_status" AS ENUM('draft', 'reviewing', 'published');--> statement-breakpoint
CREATE TABLE "articles" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"title" varchar(160) NOT NULL,
	"body_markdown" text NOT NULL,
	"category" varchar(64) NOT NULL,
	"status" "article_status" DEFAULT 'draft' NOT NULL,
	"requires_shoshi_review" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "articles_status_idx" ON "articles" USING btree ("status");--> statement-breakpoint
CREATE INDEX "articles_category_idx" ON "articles" USING btree ("category");--> statement-breakpoint
CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");--> statement-breakpoint
INSERT INTO "articles" ("id", "title", "body_markdown", "category", "status", "requires_shoshi_review") VALUES
('ar_what_is_gijinkoku_01', '什么是技人国签证', '## 适用对象

技术・人文知识・国际业务签证（简称技人国）是日本最主要的就劳签证之一。

适用对象包括在理工学、信息工学等自然科学领域，或法学、经济学、社会学等人文科学领域，或外国文化相关领域从事专业工作的人。典型职业包括系统工程师、翻译通译、设计师、财务、人事、市场营销等。

## 核心要求

- 大学或专门学校相关专业毕业，或具备同等实务经验
- 工作内容与学历或经历有关联性
- 雇主公司经营状况稳定
- 薪资不低于从事同等工作的日本人

## 在留期间

通常为 5 年、3 年、1 年、3 个月中的一种，根据个人情况和公司类别决定。', '签证相关', 'published', true),
('ar_when_to_start_01', '续签什么时候开始准备', '## 标准时间

在留期限到期前 3 个月可以开始提交更新申请。实际准备建议更早开始，给公司材料、税务证明和补充说明留出时间。

## 建议节奏

- 到期前 4-5 个月：确认在留期限、工作和税务状态
- 到期前 3 个月：开始收集公司材料与个人材料
- 到期前 1-2 个月：完成申请书和说明材料

## 最迟底线

在到期日当天之前必须提交。超过这个日期而没有申请，会进入违法居住风险。', '签证相关', 'published', true);
