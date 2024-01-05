import useSWR from 'swr';
import App from '../App';
import React, { useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Swr = () => {
  const {
    data: lists,
    error,
    isValidating,
  } = useSWR('https://apis.ccbp.in/list-creation/lists', fetcher);

  // Handles error and loading state
  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;


  // const [increaseCount,checkCount] = useState(0);

  const groupedData = lists["lists"].reduce((acc, item) => {
    const { list_number } = item;
    if (!acc[list_number]) {
      acc[list_number] = [];
    }
    acc[list_number].push(item);
    return acc;
  }, {});

  const l = Object.entries(groupedData).map(([list_number, items]) => (
    <div>
      
      <div key={list_number} class="list">
        <form>

          <input type='checkbox' class = "radio">

          </input>
          <label class = "radio_label">
            List{list_number}
          </label>
        </form>
        <div>
          {items.map((item) => (
            <div class="list_item">

              <p class="title">{item.name}</p>
              <p class="desc">{item.description}</p>

            </div>
          ))}
        </div>
      </div>
      <div id="clear"></div>
    </div>
  ));

  return (
    <div>
      <h1>List Creation</h1>

      <button class = "list_button">Create a new list</button>
      {l}
    </div>

  );
};

export default Swr;