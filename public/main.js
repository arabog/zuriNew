
const delBtn = document.querySelectorAll('.del')
const upBtn = document.querySelectorAll('.up')

Array.from(delBtn).forEach(el => {
          el.addEventListener('click', delFunc)
})

Array.from(upBtn).forEach(el => {
          el.addEventListener('click', upFunc)
})

async function delFunc() {
          const letsDel = this.parentNode.childNodes[1].innerText
          const url = 'inputDel'

          try{
                    const response = await fetch(url, {
                              method: 'delete',
                              headers: {'Content-Type': 'application/json'},
                              body: JSON.stringify(
                                        {
                                                  'getGot': letsDel,
                                        }
                              )
                    })
                    const data = await response.json()

                    location.reload()
          }
          catch(err) {
                    console.log(err)
          }

}

async function upFunc() {
          const letsUp = this.parentNode.childNodes[1].innerText
          const url = 'upUrl'

          console.log(letsUp)
          try {
                    const response = await fetch(url, {
                              method: 'put',
                              headers: {'Content-Type': 'application/json'},
                              body: JSON.stringify(
                                        {
                                                  'newName': letsUp,
                                                  name: '@Ebuka My wonderful mentor',
                                                  email: 'i4g@zuriboard.com',
                                                  country: 'naija'
                                        }
                              )
                    })
                    const data = await response.json()

                    location.reload()
          }
          catch(err) {
                    console.error(err)
          }
          
}