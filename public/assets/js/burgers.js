// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
  
    // UPDATE
    const changeEatBtns = document.querySelectorAll('.change-eat');
  
    // Set up the event listener for the create button
    if (changeEatBtns) {
      changeEatBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
          // Grabs the id of the element that goes by the name, "id"
          const id = e.target.getAttribute('data-id');
          const newEat = e.target.getAttribute('data-neweat');
  
          const newEatState = {
            devoured: newEat,
          };
  
          fetch(`/api/burgers/${id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
  
            // make sure to serialize the JSON body
            body: JSON.stringify(newEatState),
          }).then((response) => {
            // Check that the response is all good
            // Reload the page so the user can see the new quote
            if (response.ok) {
              console.log(`changed burger to: ${newEat}`);
              location.reload('/');
            } else {
              alert('something went wrong!');
            }
          });
        });
      });
    }
  
    // CREATE
    const createBurgerBtn = document.getElementById('create-form');
  
    if (createBurgerBtn) {
      createBurgerBtn.addEventListener('submit', (e) => {
        e.preventDefault();
  
        // Grabs the value of the textarea that goes by the name, "quote"
        const newBurg = {
          name: document.getElementById('burg').value.trim(),
          // sleepy: document.getElementById('sleepy').checked,
        };
  
        // Send POST request to create a new quote
        fetch('/api/burgers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
  
          // make sure to serialize the JSON body
          body: JSON.stringify(newBurg),
        }).then(() => {
          // Empty the form
          document.getElementById('burg').value = '';
  
          // Reload the page so the user can see the new quote
          console.log('Created a new burger!');
          location.reload();
        });
      });
    }
  
    // DELETE
    // const deleteBurgBtns = document.querySelectorAll('.delete-burg');
  
    // // Set up the event listeners for each delete button
    // deleteBurgBtns.forEach((button) => {
    //   button.addEventListener('click', (e) => {
    //     const id = e.target.getAttribute('data-id');
  
    //     // Send the delete request
    //     fetch(`/api/burgers/${id}`, {
    //       method: 'DELETE',
    //     }).then((res) => {
    //       console.log(res);
    //       console.log(`Deleted burger: ${id}`);
  
    //       // Reload the page
    //       location.reload();
    //     });
    //   });
    // });
  });
  