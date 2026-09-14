import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getDocumentBySlug,
  downloadDocument,
} from "../../services/document.service.js";

import {
  addBookmark,
  removeBookmark,
  checkBookmarkStatus,
} from "../../services/bookmark.service.js";

import {
  likeDocument,
  unlikeDocument,
  checkLikeStatus,
  getLikeCount,
} from "../../services/like.service.js";

import {
  addComment,
  getDocumentComments,
  updateComment,
  deleteComment,
} from "../../services/comment.service.js";

import {
  summarizeDocument,
  translateDocument,
} from "../../services/ai.service.js";

const DocumentDetails = () => {
  const { slug } = useParams();

  // ==========================================
  // DOCUMENT / COMMENTS STATE
  // ==========================================

  const [document, setDocument] = useState(null);
  const [comments, setComments] = useState([]);

  // ==========================================
  // INTERACTION STATE
  // ==========================================

  const [isBookmarked, setIsBookmarked] =
    useState(false);

  const [isLiked, setIsLiked] =
    useState(false);

  const [likeCount, setLikeCount] =
    useState(0);

  // ==========================================
  // COMMENT STATE
  // ==========================================

  const [comment, setComment] = useState("");

  const [editingComment, setEditingComment] =
    useState(null);

  const [editContent, setEditContent] =
    useState("");

  // ==========================================
  // LOADING / ERROR STATE
  // ==========================================

  const [loading, setLoading] =
    useState(true);

  const [commentsLoading, setCommentsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [actionLoading, setActionLoading] =
    useState(false);

  // ==========================================
  // AI STATE
  // ==========================================

  const [aiSummary, setAiSummary] =
    useState("");

  const [translation, setTranslation] =
    useState("");

  const [translationLanguage, setTranslationLanguage] =
    useState("");

  const [aiLoading, setAiLoading] =
    useState(false);

  const [translationLoading, setTranslationLoading] =
    useState(false);

  // ==========================================
  // LOAD DOCUMENT
  // ==========================================

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getDocumentBySlug(slug);

        const data =
          response?.data?.document ||
          response?.document ||
          response?.data ||
          null;

        setDocument(data);

        // Load previously generated AI summary
        if (data?.aiSummary) {
          setAiSummary(data.aiSummary);
        } else {
          setAiSummary("");
        }
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load document."
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadDocument();
    }
  }, [slug]);

  // ==========================================
  // LOAD INTERACTIONS
  // ==========================================

  useEffect(() => {
    if (!document?._id) return;

    const loadInteractions = async () => {
      try {
        const [
          bookmarkResponse,
          likeResponse,
          countResponse,
        ] = await Promise.allSettled([
          checkBookmarkStatus(document._id),
          checkLikeStatus(document._id),
          getLikeCount(document._id),
        ]);

        // --------------------------------------
        // BOOKMARK STATUS
        // --------------------------------------

        if (
          bookmarkResponse.status ===
          "fulfilled"
        ) {
          const data =
            bookmarkResponse.value;

          setIsBookmarked(
            data?.data?.bookmarked ??
              data?.bookmarked ??
              false
          );
        }

        // --------------------------------------
        // LIKE STATUS
        // --------------------------------------

        if (
          likeResponse.status ===
          "fulfilled"
        ) {
          const data =
            likeResponse.value;

          setIsLiked(
            data?.data?.liked ??
              data?.liked ??
              false
          );
        }

        // --------------------------------------
        // LIKE COUNT
        // --------------------------------------

        if (
          countResponse.status ===
          "fulfilled"
        ) {
          const data =
            countResponse.value;

          setLikeCount(
            data?.data?.likeCount ??
              data?.likeCount ??
              0
          );
        }
      } catch {
        // Interaction state is optional.
      }
    };

    loadInteractions();
  }, [document?._id]);

  // ==========================================
  // LOAD COMMENTS
  // ==========================================

  useEffect(() => {
    if (!document?._id) return;

    const loadComments = async () => {
      setCommentsLoading(true);

      try {
        const response =
          await getDocumentComments(
            document._id
          );

        const data =
          response?.data?.comments ||
          response?.comments ||
          response?.data ||
          [];

        setComments(
          Array.isArray(data)
            ? data
            : []
        );
      } catch {
        setComments([]);
      } finally {
        setCommentsLoading(false);
      }
    };

    loadComments();
  }, [document?._id]);

  // ==========================================
  // AI SUMMARY
  // ==========================================

  const handleSummarize = async () => {
    if (
      !document?._id ||
      aiLoading
    ) {
      return;
    }

    setAiLoading(true);
    setError("");

    try {
      const response =
        await summarizeDocument(
          document._id
        );

      const summary =
        response?.data?.summary ||
        response?.summary ||
        "";

      if (!summary) {
        throw new Error(
          "No summary was returned."
        );
      }

      setAiSummary(summary);

      // Keep local document state in sync
      setDocument((previous) =>
        previous
          ? {
              ...previous,
              aiSummary: summary,
            }
          : previous
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to summarize document."
      );
    } finally {
      setAiLoading(false);
    }
  };

  // ==========================================
  // AI TRANSLATION
  // ==========================================

  const handleTranslate = async () => {
    if (
      !document?._id ||
      !translationLanguage.trim() ||
      translationLoading
    ) {
      return;
    }

    setTranslationLoading(true);
    setError("");

    try {
      const response =
        await translateDocument(
          document._id,
          translationLanguage.trim()
        );

      const translatedText =
        response?.data?.translation ||
        response?.translation ||
        "";

      if (!translatedText) {
        throw new Error(
          "No translation was returned."
        );
      }

      setTranslation(
        translatedText
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to translate document."
      );
    } finally {
      setTranslationLoading(false);
    }
  };

  // ==========================================
  // BOOKMARK
  // ==========================================

  const handleBookmark = async () => {
    if (
      !document?._id ||
      actionLoading
    ) {
      return;
    }

    setActionLoading(true);
    setError("");

    try {
      if (isBookmarked) {
        await removeBookmark(
          document._id
        );

        setIsBookmarked(false);
      } else {
        await addBookmark(
          document._id
        );

        setIsBookmarked(true);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update bookmark."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // LIKE
  // ==========================================

  const handleLike = async () => {
    if (
      !document?._id ||
      actionLoading
    ) {
      return;
    }

    setActionLoading(true);
    setError("");

    try {
      if (isLiked) {
        await unlikeDocument(
          document._id
        );

        setIsLiked(false);

        setLikeCount((count) =>
          Math.max(0, count - 1)
        );
      } else {
        await likeDocument(
          document._id
        );

        setIsLiked(true);

        setLikeCount(
          (count) => count + 1
        );
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update like."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // DOWNLOAD
  // ==========================================

  const handleDownload = async () => {
    if (!document?._id) return;

    setError("");

    try {
      const response =
        await downloadDocument(
          document._id
        );

      const blob = new Blob([
        response.data,
      ]);

      const url =
        window.URL.createObjectURL(
          blob
        );

      const anchor =
        window.document.createElement(
          "a"
        );

      anchor.href = url;

      anchor.download =
        document.title ||
        "document";

      window.document.body.appendChild(
        anchor
      );

      anchor.click();

      anchor.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to download document."
      );
    }
  };

  // ==========================================
  // ADD COMMENT
  // ==========================================

  const handleAddComment = async (
    event
  ) => {
    event.preventDefault();

    if (!comment.trim()) return;

    setError("");

    try {
      const response =
        await addComment(
          document._id,
          {
            content:
              comment.trim(),
          }
        );

      const newComment =
        response?.data?.comment ||
        response?.comment ||
        null;

      if (newComment) {
        setComments(
          (previous) => [
            ...previous,
            newComment,
          ]
        );
      } else {
        const refreshed =
          await getDocumentComments(
            document._id
          );

        const data =
          refreshed?.data
            ?.comments ||
          refreshed?.comments ||
          refreshed?.data ||
          [];

        setComments(
          Array.isArray(data)
            ? data
            : []
        );
      }

      setComment("");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to add comment."
      );
    }
  };

  // ==========================================
  // UPDATE COMMENT
  // ==========================================

  const handleUpdateComment = async (
    commentId
  ) => {
    if (!editContent.trim()) return;

    setError("");

    try {
      const response =
        await updateComment(
          commentId,
          editContent.trim()
        );

      const updated =
        response?.data?.comment ||
        response?.comment ||
        null;

      setComments(
        (previous) =>
          previous.map(
            (item) =>
              item._id === commentId
                ? updated || {
                    ...item,
                    content:
                      editContent.trim(),
                  }
                : item
          )
      );

      setEditingComment(null);
      setEditContent("");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update comment."
      );
    }
  };

  // ==========================================
  // DELETE COMMENT
  // ==========================================

  const handleDeleteComment = async (
    commentId
  ) => {
    const confirmed =
      window.confirm(
        "Delete this comment?"
      );

    if (!confirmed) return;

    setError("");

    try {
      await deleteComment(
        commentId
      );

      setComments(
        (previous) =>
          previous.filter(
            (item) =>
              item._id !== commentId
          )
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to delete comment."
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-paper px-6 py-20 text-ink md:px-12">
        <div className="mx-auto max-w-[1180px]">

          <div className="h-3 w-24 bg-paper-raised" />

          <div className="mt-6 h-12 max-w-3xl bg-paper-raised" />

          <div className="mt-4 h-4 max-w-xl bg-paper-raised" />

          <div className="mt-12 h-[500px] w-full bg-paper-raised" />

        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR / NOT FOUND
  // ==========================================

  if (!document) {
    return (
      <main className="min-h-screen bg-paper px-6 py-20 text-ink md:px-12">

        <div className="mx-auto max-w-[760px] text-center">

          <span className="page-eyebrow">
            DOCYARD
          </span>

          <h1 className="mt-3 font-display text-5xl font-semibold">
            Document not found.
          </h1>

          <p className="mt-4 text-sm text-ink-soft">
            {error ||
              "The document you're looking for could not be found."}
          </p>

          <Link
            to="/documents"
            className="btn btn-primary mt-7"
          >
            Browse documents
          </Link>

        </div>

      </main>
    );
  }

  const author =
    document.author?.name ||
    document.author?.username ||
    document.author ||
    document.createdBy?.username ||
    "Unknown contributor";

 return (
  <main className="min-h-screen bg-paper text-ink">

    {/* =====================================================
        DOCUMENT HEADER
    ===================================================== */}

    <section className="w-full px-6 pb-12 pt-12 sm:px-10 md:px-14 md:pb-14 md:pt-16 lg:px-20 xl:px-24">

      <div className="w-full">

        <Link
          to="/documents"
          className="inline-flex !h-12 items-center justify-center rounded-lg border border-[#0A3A63] bg-[#0A3A63] px-7 text-sm font-semibold !text-[#ffffff] shadow-sm transition-all hover:border-ink hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          Back to archive
        </Link>


        <div className="mt-10 w-full">

          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-blue/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue">
              {document.category || "Archive"}
            </span>

            {document.fileType && (
              <span className="rounded-full bg-paper-raised px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-ink-soft">
                {document.fileType.replace(".", "")}
              </span>
            )}

          </div>


          <h1 className="mt-5 max-w-6xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[80px]">
            {document.title}
          </h1>


          {document.description && (
            <p className="mt-6 max-w-4xl text-base leading-7 text-ink-soft md:text-lg md:leading-8">
              {document.description}
            </p>
          )}


          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-faint md:text-base">

            <span>
              By{" "}
              <span className="font-medium text-ink-soft">
                {author}
              </span>
            </span>


            {document.createdAt && (
              <span>
                {new Date(
                  document.createdAt
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}


            {document.language && (
              <span>
                {document.language}
              </span>
            )}


            {document.views !== undefined && (
              <span>
                {document.views} views
              </span>
            )}

          </div>

        </div>

      </div>

    </section>


    {/* =====================================================
        DOCUMENT + DETAILS
    ===================================================== */}

    <section className="w-full px-6 pb-16 sm:px-10 md:px-14 md:pb-20 lg:px-20 xl:px-24">

      <div className="w-full">

        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">


          {/* =================================================
              DOCUMENT PREVIEW
          ================================================= */}

          <div className="min-w-0">

            <div className="overflow-hidden rounded-xl border border-line bg-white">

              {document.fileUrl ? (

                <iframe
                  src={document.fileUrl}
                  title={document.title}
                  className="h-[700px] w-full sm:h-[780px] lg:h-[820px] xl:h-[900px]"
                />

              ) : (

                <div className="flex h-[560px] items-center justify-center bg-paper-raised sm:h-[650px]">

                  <div className="px-6 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-ink text-paper">

                      <span className="font-mono text-sm font-medium uppercase">
                        {(
                          document.fileType || "DOC"
                        ).replace(".", "")}
                      </span>

                    </div>


                    <h3 className="mt-5 text-lg font-semibold">
                      Preview unavailable
                    </h3>


                    <p className="mt-2 text-base text-ink-soft">
                      This document cannot be previewed here.
                    </p>

                  </div>

                </div>

              )}

            </div>


            {/* =================================================
                DOCUMENT ACTIONS
            ================================================= */}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-paper-raised p-4 md:p-5">

              <div className="flex flex-wrap items-center gap-3">

                {/* LIKE */}

                <button
                  type="button"
                  onClick={handleLike}
                  disabled={actionLoading}
                  className={`inline-flex h-11 items-center gap-2 rounded-md px-5 text-sm font-semibold transition ${
                    isLiked
                      ? "bg-blue text-white"
                      : "border border-line bg-paper text-ink hover:border-ink hover:bg-white"
                  }`}
                >

                  <span className="text-base">
                    {isLiked ? "♥" : "♡"}
                  </span>

                  <span>
                    {isLiked ? "Liked" : "Like"}
                  </span>

                  <span className="opacity-70">
                    {likeCount}
                  </span>

                </button>


                {/* BOOKMARK */}

                <button
                  type="button"
                  onClick={handleBookmark}
                  disabled={actionLoading}
                  className={`inline-flex h-11 items-center gap-2 rounded-md border px-5 text-sm font-semibold transition ${
                    isBookmarked
                      ? "border-blue bg-blue/10 text-blue"
                      : "border-line bg-paper text-ink hover:border-ink hover:bg-white"
                  }`}
                >

                  <span className="text-base">
                    {isBookmarked ? "★" : "☆"}
                  </span>

                  {isBookmarked
                    ? "Saved"
                    : "Save"}

                </button>

              </div>


              {/* DOWNLOAD */}

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex h-11 items-center rounded-md bg-blue px-6 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:bg-[#0f3152] active:translate-y-0"
              >
                Download

                <span className="ml-2 text-base">
                  ↓
                </span>

              </button>

            </div>

          </div>


          {/* =================================================
              DOCUMENT DETAILS
          ================================================= */}

          <aside className="h-fit">

            <div className="rounded-xl border border-line bg-paper-raised p-6 lg:sticky lg:top-6">

              <div className="mb-6">

                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                  Document details
                </span>

                <h2 className="mt-2 font-display text-2xl font-semibold">
                  Information
                </h2>

              </div>


              <div className="space-y-6">

                {/* TITLE */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                    Title
                  </p>

                  <p className="mt-1.5 text-sm leading-6 text-ink">
                    {document.title}
                  </p>

                </div>


                {/* CONTRIBUTOR */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                    Contributor
                  </p>

                  <p className="mt-1.5 text-sm text-ink">
                    {author}
                  </p>

                </div>


                {/* CATEGORY */}

                {document.category && (
                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                      Category
                    </p>

                    <p className="mt-1.5 text-sm text-ink">
                      {document.category}
                    </p>

                  </div>
                )}


                {/* LANGUAGE */}

                {document.language && (
                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                      Language
                    </p>

                    <p className="mt-1.5 text-sm text-ink">
                      {document.language}
                    </p>

                  </div>
                )}


                {/* FILE SIZE */}

                {document.fileSize && (
                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                      File size
                    </p>

                    <p className="mt-1.5 text-sm text-ink">
                      {document.fileSize}
                    </p>

                  </div>
                )}

              </div>

            </div>

          </aside>

        </div>

      </div>

    </section>


    {/* =====================================================
        ERROR
    ===================================================== */}

    {error && (
      <section className="w-full px-6 pb-8 sm:px-10 md:px-14 lg:px-20 xl:px-24">

        <div
          className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700"
          role="alert"
        >
          {error}
        </div>

      </section>
    )}


    {/* =====================================================
        AI TOOLS
    ===================================================== */}

    <section className="w-full px-6 pb-16 sm:px-10 md:px-14 md:pb-20 lg:px-20 xl:px-24">

      <div className="w-full">


        {/* AI HEADER */}

        <div className="mb-8">

          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">
            Document intelligence
          </span>

          <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
            Understand this document.
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
            Use DocYard's AI tools to quickly summarize
            or translate the document.
          </p>

        </div>


        {/* AI CARDS */}

        <div className="grid w-full gap-5 lg:grid-cols-2">


          {/* =================================================
              SUMMARY
          ================================================= */}

          <div className="rounded-xl border border-line bg-paper-raised p-7 md:p-8">

            <div className="flex items-start justify-between gap-5">

              <div>

                <span className="text-xs font-semibold uppercase tracking-wide text-blue">
                  AI Summary
                </span>

                <h3 className="mt-2 font-display text-2xl font-semibold">
                  Get the key points.
                </h3>

              </div>


              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-lg text-blue">
                ✦
              </div>

            </div>


            <p className="mt-4 text-base leading-7 text-ink-soft">
              Generate a concise overview of this
              document using AI.
            </p>


            <button
              type="button"
              onClick={handleSummarize}
              disabled={aiLoading}
              className="mt-6 inline-flex h-11 items-center rounded-md bg-[#0A3A63] px-6 text-sm font-semibold !text-[#ffffff] transition hover:-translate-y-[1px] hover:bg-[#0f3152] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {aiLoading
                ? "Generating..."
                : aiSummary
                  ? "Regenerate Summary"
                  : "Summarize Document"}
            </button>


            {aiSummary && (
              <div className="mt-7 rounded-lg border border-line bg-paper p-6">

                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  Summary
                </p>

                <div className="whitespace-pre-wrap text-sm leading-7 text-ink-soft">
                  {aiSummary}
                </div>

              </div>
            )}

          </div>


          {/* =================================================
              TRANSLATION
          ================================================= */}

          <div className="rounded-xl border border-line bg-paper-raised p-7 md:p-8">

            <div className="flex items-start justify-between gap-5">

              <div>

                <span className="text-xs font-semibold uppercase tracking-wide !text-[#0A3A63]">
                  Translation
                </span>

                <h3 className="mt-2 font-display text-2xl font-semibold">
                  Read it your way.
                </h3>

              </div>


              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-lg font-medium text-blue">
                Aa
              </div>

            </div>


            <p className="mt-4 text-base leading-7 text-ink-soft">
              Translate the document into another
              language using AI.
            </p>


            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <input
                type="text"
                value={translationLanguage}
                onChange={(event) =>
                  setTranslationLanguage(
                    event.target.value
                  )
                }
                placeholder="Target language"
                className="h-11 min-w-0 flex-1 rounded-md border border-line bg-paper px-4 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-blue focus:ring-2 focus:ring-blue/10"
              />


              <button
                type="button"
                onClick={handleTranslate}
                disabled={
                  translationLoading ||
                  !translationLanguage.trim()
                }
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#0A3A63] px-6 text-sm font-semibold !text-[#ffffff] transition hover:-translate-y-[1px] hover:bg-[#0f3152] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {translationLoading
                  ? "Translating..."
                  : "Translate"}
              </button>

            </div>


            {translation && (
              <div className="mt-7 rounded-lg border border-line bg-paper p-6">

                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  Translated content
                </p>

                <div className="whitespace-pre-wrap text-sm leading-7 text-ink-soft">
                  {translation}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </section>


    {/* =====================================================
        COMMENTS
    ===================================================== */}

    <section className="w-full px-6 pb-20 sm:px-10 md:px-14 md:pb-24 lg:px-20 xl:px-24">

      <div className="w-full">


        {/* COMMENTS HEADER */}

        <div className="mb-8">

          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">
            Discussion
          </span>

          <div className="mt-2 flex items-end justify-between gap-4">

            <div>

              <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
                Comments
              </h2>

              <p className="mt-2 text-base text-ink-soft">
                Share your thoughts about this document.
              </p>

            </div>


            <span className="rounded-full bg-paper-raised px-4 py-1.5 text-sm font-medium text-ink-soft">
              {comments.length}
            </span>

          </div>

        </div>


        {/* =================================================
            ADD COMMENT
        ================================================= */}

        <form
          onSubmit={handleAddComment}
          className="w-full rounded-xl border border-line bg-paper-raised p-6 md:p-7"
        >

          <label
            htmlFor="comment"
            className="text-sm font-semibold"
          >
            Add a comment
          </label>


          <textarea
            id="comment"
            value={comment}
            onChange={(event) =>
              setComment(event.target.value)
            }
            placeholder="Share something about this document..."
            rows={4}
            className="mt-3 w-full resize-y rounded-md border border-line bg-paper px-4 py-3 text-base leading-7 text-ink outline-none transition placeholder:text-ink-faint focus:border-blue focus:ring-2 focus:ring-blue/10"
          />


          <div className="mt-4 flex justify-end">

            <button
              type="submit"
              className="inline-flex h-11 items-center rounded-md bg-[#0A3A63] px-6 text-sm font-semibold text-[#ffffff] transition hover:-translate-y-[1px] hover:bg-[#0f3152] active:translate-y-0"
            >
              Post Comment

            </button>

          </div>

        </form>


        {/* =================================================
            COMMENTS LIST
        ================================================= */}

        <div className="mt-8">

          {commentsLoading ? (

            <div className="w-full rounded-xl border border-line bg-paper-raised p-7">

              <p className="text-base text-ink-soft">
                Loading comments...
              </p>

            </div>

          ) : comments.length === 0 ? (

            <div className="w-full rounded-xl border border-line bg-paper-raised px-6 py-16 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink-soft">
                💬
              </div>


              <h3 className="mt-4 text-lg font-semibold">
                No comments yet
              </h3>


              <p className="mt-2 text-base text-ink-soft">
                Be the first person to start the discussion.
              </p>

            </div>

          ) : (

            <div className="grid w-full gap-4">

              {comments.map((item) => {

                const commenter =
                  item.user?.username ||
                  item.user?.name ||
                  item.username ||
                  "Contributor";


                return (
                  <article
                    key={item._id}
                    className="w-full rounded-xl border border-line bg-paper-raised p-6 md:p-7"
                  >

                    {/* COMMENT HEADER */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-3">
  {/*The user icon who commented*/}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A3A63] text-sm font-semibold uppercase !text-[#ffffff]">
                          {commenter
                            .charAt(0)
                            .toUpperCase()}
                        </div>


                        <div>

                          <p className="text-sm font-semibold">
                            {commenter}
                          </p>


                          {item.createdAt && (
                            <p className="mt-0.5 text-xs text-ink-faint">
                              {new Date(
                                item.createdAt
                              ).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          )}

                        </div>

                      </div>

                    </div>


                    {/* EDIT MODE */}

                    {editingComment === item._id ? (

                      <div className="mt-5">

                        <textarea
                          value={editContent}
                          onChange={(event) =>
                            setEditContent(
                              event.target.value
                            )
                          }
                          rows={3}
                          className="w-full resize-y rounded-md border border-line bg-[#0A3A63] px-4 py-3 text-base leading-7 outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/10"
                        />


                        <div className="mt-3 flex flex-wrap gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateComment(
                                item._id
                              )
                            }
                            className="inline-flex h-10 items-center rounded-md bg-[#0A3A63] px-5 text-sm font-semibold text-[#ffffff] transition hover:bg-[#0f3152]"
                          >
                            Save changes
                          </button>


                          <button
                            type="button"
                            onClick={() => {
                              setEditingComment(null);
                              setEditContent("");
                            }}
                            className="inline-flex h-10 items-center rounded-md border border-line bg-paper px-5 text-sm font-medium transition hover:border-ink hover:bg-white"
                          >
                            Cancel
                          </button>

                        </div>

                      </div>

                    ) : (

                      <>

                        {/* COMMENT CONTENT */}

                        <p className="mt-5 text-base leading-7 text-ink-soft">
                          {item.content}
                        </p>


                        {/* COMMENT ACTIONS */}

                        <div className="mt-5 flex flex-wrap gap-2">

                          <button
                            type="button"
                            onClick={() => {
                              setEditingComment(item._id);
                              setEditContent(
                                item.content || ""
                              );
                            }}
                            className="inline-flex h-9 items-center rounded-md border border-line bg-[#0A3A63] !text-[#ffffff] px-4 text-sm font-medium text-ink-soft transition hover:border-ink hover:text-ink"
                          >
                            Edit
                          </button>


                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteComment(
                                item._id
                              )
                            }
                            className="inline-flex h-9 items-center rounded-md border border-line bg-[#0A3A63] !text-[#ffffff] px-4 text-sm font-medium text-ink-soft transition hover:border-red-300 hover:text-red-600"
                          >
                            Delete
                          </button>

                        </div>

                      </>

                    )}

                  </article>
                );
              })}

            </div>

          )}

        </div>

      </div>

    </section>

  </main>
);
}

export default DocumentDetails;