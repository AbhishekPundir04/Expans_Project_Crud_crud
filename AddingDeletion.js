
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
    axios.post("https://crudcrud.com/api/a287a3bf54f74fccbbfac249d3828991/addExpense", obj)
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
    axios.get("https://crudcrud.com/api/a287a3bf54f74fccbbfac249d3828991/addExpense")
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
    const childHTML = `<li id=${user._id}> ${user.expense} - ${user.description} 
        <button onclick = deleteUser('${user._id}')> Delete User
        <button onclick = editUser('${user._id}','${user.expense}','${user.selecting})    
        </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/a287a3bf54f74fccbbfac249d3828991/addExpense/${userId}`)
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
