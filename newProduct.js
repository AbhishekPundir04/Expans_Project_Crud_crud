
function addExpense(event) {
    event.preventDefault();
    const expense = event.target.amount.value;
    const description = event.target.descrip.value;
    const selecting = event.target.category.value;
    const obj = {
        expense,
        description,
        selecting
    }
    axios.post("https://crudcrud.com/api/f3e8da96583d4a7cb5921723e2290671/addExpense", obj)
        .then((response) => {
            showUserOnScreen(response.data)

            console.log(response)
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>"
            console.log(err)
        })
        
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/f3e8da96583d4a7cb5921723e2290671/addExpense")
        .then((response) => {
            // console.log(response)
            for (var i = 0; i < response.data.length; i++) {
                showUserOnScreen(response.data[i])
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

function showUserOnScreen(user) {
    document.getElementById('amountId').value = '';
    document.getElementById('descripId').value = '';
    document.getElementById('categoryId').value = '';

    const parentNode = document.getElementById('listOfUser');
    const childHTML = `<li id=${user._id}> ${user.expense} - ${user.description} - ${user.selecting}
        <button onclick = deleteUser('${user._id}')> Delete User </button>
        <button onclick = editUser('${user.expense}','${user.description}','${user.selecting}','${user._id}')>Edit User</button>  
        </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
    if()
}

function editUser(amountId, descripId, categoryId, userId) {
    document.getElementById('amountId').value = amountId;
    document.getElementById('descripId').value = descripId;
    document.getElementById('categoryId').value = categoryId;
    deleteUser(userId)
}

function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/f3e8da96583d4a7cb5921723e2290671/addExpense/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId)
        })
        .catch((err) => {
            console.log(err);
        })
}

function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('listOfUser')
    const childNodeToBeDeleted = document.getElementById(userId)
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
