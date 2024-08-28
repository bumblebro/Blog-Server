import Link from "next/link";

interface Props {
  pageNo?: string;
  totalPages: number;
  hasNextPage: boolean;
}

function Pagination({ pageNo = "1", totalPages, hasNextPage }: Props) {
  const currentPage = parseInt(pageNo);
  const getPages = () => {
    let start = 1;
    let end = start + 10;

    if (totalPages > 10) {
      if (parseInt(pageNo) % 10 == 0) {
        start = parseInt(pageNo);
      } else {
        let start = parseInt(pageNo) - (parseInt(pageNo) % 10);
      }
    }
    if (end > totalPages) {
      end = totalPages;
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getPages();
  if (totalPages === 1) return null;

  return (
    <div>
      <nav>
        {currentPage !== 1 && (
          <Link href={`?pageNo=${currentPage - 1}`}>{"<<"}</Link>
        )}

        {pages.map((page, i) => {
          return (
            <Link key={i} href={`?pageNo=${page}`}>
              {page}
            </Link>
          );
        })}

        {hasNextPage && <Link href={`?pageNo=${currentPage + 1}`}>{">>"}</Link>}
      </nav>
    </div>
  );
}

export default Pagination;
