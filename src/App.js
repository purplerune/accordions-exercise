import { useState } from "react";
import { USERS } from "./users.constants";
import classnames from "classnames";
import _ from "lodash";

const groupByBenefitProvider = (users) => {
  const groupedUsers = users.reduce((accumulator, elem) => {
    const group = accumulator;
    if (!(elem.provider in group)) {
      group[elem.provider] = { users: [elem], isOpen: true };
    } else {
      group[elem.provider].users.push(elem);
    }
    return group;
  }, {});

  return groupedUsers;
};

function App() {
  const [users, setUsers] = useState(groupByBenefitProvider(USERS));

  const onAccordionClick = (key) => {
    const newUsers = _.cloneDeep(users);
    newUsers[key].isOpen = !newUsers[key].isOpen;
    setUsers(newUsers);
  };

  return (
    <div className="App container">
      <h1>Health Benefits</h1>
      {Object.keys(users).map((key) => {
        const accordionClasses = classnames({
          accordion__content: true,
          isOpen: users[key].isOpen,
        });

        return (
          <div key={key} className="accordion">
            <div className="accordion__header">
              <h2>{key}</h2>
              <button
                className="accordion__header__button"
                onClick={() => onAccordionClick(key)}
              >
                {users?.[key]?.isOpen ? "-" : "+"}
              </button>
            </div>
            {!!users?.[key]?.isOpen && (
              <div className={accordionClasses}>
                {users[key].users.map((user) => (
                  <p key={user.id}>{user.name}</p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
