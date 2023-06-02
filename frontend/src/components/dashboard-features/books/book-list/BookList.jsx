import { ModeEdit, Add } from "@mui/icons-material";

const BookList = () => {
  return (
    <div className="content-container">
      <div className="content-container__header">
        <h2 className="content-container__header-title">Books</h2>
      </div>
      <div className="content-container__item">
        <div className="card">
          <div className="card__header">
            <h3 className="card__header-title">Book list</h3>
            <div className="card__header-buttons">
              <button className="link-button approve">
                <Add />
                <span className="link-button__content">Add book</span>
              </button>
            </div>
          </div>
          <div className="card__body">
            <div className="card__body-item">
              <table className="table">
                <thead className="table__header">
                  <th className="table__header-item">Writing</th>
                  <th className="table__header-item">Genres</th>
                  <th className="table__header-item">Authors</th>
                  <th className="table__header-item">Publisher</th>
                  <th className="table__header-item">Release year</th>
                  <th className="table__header-item">Edit</th>
                </thead>
                <tbody className="table__body">
                  <tr className="table__row odd">
                    <td className="table__row-item">Harry Potter</td>
                    <td className="table__row-item">Fantasy</td>
                    <td className="table__row-item">J. K. Rowling</td>
                    <td className="table__row-item">Bloomsbury</td>
                    <td className="table__row-item">1997</td>
                    <td className="table__row-item">
                      <ModeEdit />
                    </td>
                  </tr>
                  <tr className="table__row even">
                    <td className="table__row-item">test1</td>
                    <td className="table__row-item">test2</td>
                    <td className="table__row-item">test3</td>
                    <td className="table__row-item">test4</td>
                    <td className="table__row-item">test5</td>
                    <td className="table__row-item">
                      <ModeEdit />
                    </td>
                  </tr>
                  <tr className="table__row odd">
                    <td className="table__row-item">test1</td>
                    <td className="table__row-item">test2</td>
                    <td className="table__row-item">test3</td>
                    <td className="table__row-item">test4</td>
                    <td className="table__row-item">test5</td>
                    <td className="table__row-item">
                      <ModeEdit />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
