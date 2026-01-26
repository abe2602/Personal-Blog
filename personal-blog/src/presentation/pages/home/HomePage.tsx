import { useEffect, useLayoutEffect } from "react";
import { Post } from "../../../domain/model/Post";
import SideMenu from "../../components/profile_sidemenu/ProfileSideMenu";
import PostContent from "../../components/PostContent";
import SearchInput from "../../components/SearchInput";
import NavBar from "../../components/navbar/NavBar";
import DI from "../../../di/DiModule";
import { usePostsStore } from "./HomeStore";
import CircularProgress from "../../components/circular_progress/CircularProgress";

const HomePage = () => {
  const { } = usePostsStore();
  const { actions, state } = DI.resolve("HomeController");
  const { setScrollPosition, scrollPosition } = usePostsStore();

  // Subscribe to store changes to make it reactive
  const posts = state.posts;
  const isLoading = state.isLoading;
  const searchTerm = state.searchTerm;
  const selectedYear = state.selectedYear;
  const error = state.error;
  const currentPage = state.currentPage;
  const availableYears = state.availableYears;
  const totalPages = state.totalPages;
  
  useEffect(() => {
    actions.getPosts();
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPage]);

  useLayoutEffect(() => {
    if (scrollPosition > 0 && !isLoading && posts.length > 0 && currentPage === 1) {
      window.scrollTo(0, scrollPosition);
    }
  }, [isLoading, posts.length, scrollPosition, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollPosition]);

  if (isLoading) {
    return (
      <div className="main-container">
        <NavBar />
        <div className="content-layout">
          <div className="posts-section">
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-container">
        <NavBar />
        <div className="content-layout">
          <div className="posts-section">
            <p>Error loading posts: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    actions.setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="pagination-button"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis-start" className="pagination-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis-end" className="pagination-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="pagination-button"
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button pagination-nav"
        >
          Previous
        </button>
        <div className="pagination-numbers">
          {pages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button pagination-nav"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="main-container">
      <NavBar />
      <div className="content-layout">
        <div className="posts-section">
          <SearchInput onChangeCallback={actions.setSearchTerm} value={searchTerm} />
          <ul>
            {posts.map((post: Post, index: number) => (
              <PostContent key={post.title + index} index={index} post={post} />
            ))}
          </ul>
          {renderPagination()}
        </div>
        <div className="sidebar-section">
          <SideMenu
            availableYears={availableYears}
            selectedYear={selectedYear}
            onYearSelect={actions.setSelectedYear}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
