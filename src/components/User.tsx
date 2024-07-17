import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteUser, editUser, IUser } from "../reduxRTK/usersSlice";
import { useDispatch } from "react-redux";

interface IProps {
  user: IUser;
}

const User: FC<IProps> = ({ user }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const dispatch = useDispatch();

  return (
    <div className="card mb-3">
      <div className="card-body">
        {isEdit ? (
          <div>
            <input
              className="form-control mb-2"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className="form-control mb-2"
              name="company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
              className="form-control mb-2"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={() => {
                setIsEdit(false);
                dispatch(
                  editUser({
                    ...user,
                    name: userName,
                    company: {
                      name: companyName,
                    },
                    phone,
                  })
                );
              }}
              className="btn btn-success btn-sm me-2"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-between">
            <NavLink
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/users/${user.id}`}
            >
              <div>
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {user.company.name}
                </h6>
                <p className="card-text">{user.phone}</p>
              </div>
            </NavLink>
            <div style={{ justifyItems: "right" }}>
              <button
                onClick={() => setIsEdit(true)}
                className="btn btn-warning btn-sm me-2"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteUser(user.id - 1))}
                className="btn btn-danger btn-sm"
              >
                Del
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
