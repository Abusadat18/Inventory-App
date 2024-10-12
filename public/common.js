const addBookCtn = document.querySelector(".add-book-ctn")
    const addCategoryCtn = document.querySelector(".add-category-ctn")

    addBookCtn.addEventListener("click", () => {
        window.location.href = "/categories/addBook"
    })

    addCategoryCtn.addEventListener("click", () => {
        window.location.href = "/categories/addCategory"
    })

    const showBookDetailBtns = document.querySelectorAll(".card-detail-btn")
    showBookDetailBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const bookId = btn.getAttribute("data-book-id")
            window.location.href = `/books/${bookId}`
        })
    });

    const editBookBtns = document.querySelectorAll(".card-edit-btn")
    editBookBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const bookId = btn.getAttribute("data-book-id")
            window.location.href = `/books/editBook/${bookId}`
        })
    })

    const deleteBookBtns = document.querySelectorAll(".card-del-btn")
    deleteBookBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const bookid = btn.getAttribute("data-book-id")
            window.location.href = `/books/delete/${bookid}`
        })
    })
    
    const deleteCategoryBtns = document.querySelectorAll(".category-del-btn")
    deleteCategoryBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const categoryid = btn.getAttribute("data-cat-id")
            window.location.href = `/categories/delete/${categoryid}`
        })
    })

    const editCategoryBtns = document.querySelectorAll(".category-edit-btn")
    editCategoryBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const categoryid = btn.getAttribute("data-cat-id")
            window.location.href = `/categories/edit/${categoryid}`
        })
    })

    const supplierCtn = document.querySelector(".supplier-ctn")
    supplierCtn.addEventListener("click", () => {
        window.location.href = "/suppliers"
    })

    const filterCategories = document.querySelectorAll(".filter-category")
    filterCategories.forEach((category) => {
        category.addEventListener("click", () => {
            const categoryid = category.getAttribute("data-cat-id")
            window.location.href = `/?categoryid=${categoryid}`
        })
    })

    const allCategory = document.querySelector(".category-all")
    allCategory.addEventListener("click", () => {
        window.location.href = "/"
    })