import { useEffect, useState } from "react";

interface PaginationProps {
  next: VoidFunction;
  prev: VoidFunction;
  jump: (page: any) => void;
  data: any[];
  currentPage: any;
  maxPage: any;
}

function Pagination({
  next,
  prev,
  jump,
  data,
  currentPage,
  maxPage,
}: PaginationProps) {
  const pagesArray = Array.from(Array(maxPage).keys()).map((i) => i + 1);
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    setPages(pagesArray);
    let tempPages: any = [...pagesArray];

    if (currentPage >= 1 && currentPage <= 3) {
      tempPages = tempPages.slice(0, 4);
    } else if (currentPage > 3 && currentPage < maxPage - 2) {
      tempPages = tempPages.slice(currentPage - 3, currentPage);
      tempPages.push(currentPage + 1);
      tempPages.push(currentPage + 2);
    } else if (currentPage > maxPage - 3) {
      tempPages = tempPages.slice(maxPage - 4);
    }
    setPages(tempPages);
  }, [currentPage, data]);

  return (
    <div className="flex justify-center mt-6">
      <nav aria-label="Page navigation">
        <ul className="flex list-style-none">
          <li>
            <button
              onClick={prev}
              className={`${
                currentPage <= 1
                  ? "hover:bg-none cursor-default pointer-events-none text-gray-400"
                  : "hover:bg-gray-200 cursor-pointer text-[#C2CBDD]"
              } mx-4 page-link relative block py-0.5 px-2 border-0 bg-[#F9F9FA] outline-none transition-all duration-300 rounded hover:text-gray-800 focus:shadow-none`}
              aria-disabled={currentPage <= 1}
              aria-label="Previous"
            >
              <i className="bx bx-left-arrow-alt text-2xl align-middle"></i>
            </button>
          </li>
          {pages.map((pageIndex, idx) => (
            <li key={idx}>
              <button
                onClick={() => jump(pageIndex)}
                className={`${
                  pageIndex === currentPage
                    ? "bg-[#8B9DBF] text-white hover:text-white hover:bg-[#8B9DBF] focus:shadow-md"
                    : "bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                } relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded`}
              >
                {pageIndex}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={next}
              className={`${
                currentPage >= maxPage
                  ? "hover:bg-none cursor-default pointer-events-none text-gray-400"
                  : "hover:bg-gray-200 cursor-pointer text-[#C2CBDD]"
              } mx-4 page-link relative block py-0.5 px-2 border-0 bg-[#F9F9FA] outline-none transition-all duration-300 rounded hover:text-gray-800 focus:shadow-none`}
              aria-label="Next"
              aria-disabled={currentPage >= maxPage}
            >
              <i className="bx bx-right-arrow-alt text-2xl align-middle"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
