// function cs_discount_applied_Cart(e) {
//   console.log('after discount applied on cart', e);
// }

function get_cookie(name){
  let cookie = null;
  document.cookie.split(";").forEach(c => c.includes(name) && (cookie = c.split("=")?.[1]));
  return cookie
}

// function delete_cookie(name, path, domain) {
//   if( get_cookie( name ) ) {
//     document.cookie = name + "=" +
//       ((path) ? ";path="+path:"")+
//       ((domain)?";domain="+domain:"") +
//       ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
//   }
// }

function update_cookie(name, newValue) {
  if( get_cookie( name ) ) {
    document.cookie = name + "=" + newValue;
  }
}

function update_cookie(name, newValue) {
  if( get_cookie( name ) ) {
    document.cookie = name + "=" + newValue;
  }
}

function simulateAddingDiscount(cartTotal, smileSelectedDiscount) {
  document.querySelectorAll(".aiod_cart_loaded").forEach(btn => {
    btn.classList.add("aiod_checkout_clicked")
  });

  cartTotal.classList.add("smail-discount-added");
  const smileWrap = cartTotal.querySelector(".csapp_aiod_coupan");

  smileWrap && (smileWrap.querySelector("input").value = smileSelectedDiscount);
  window.localStorage.setItem("temporary_discount_code", smileSelectedDiscount);
  smileWrap && smileWrap.querySelector("button").click();
  // console.log("simulated click")
  setTimeout(() => {
    document.querySelectorAll(".aiod_cart_loaded").forEach(btn => {
      btn.classList.remove("aiod_checkout_clicked")
    });

    update_cookie("discount_code", "applied");
    window.localStorage.removeItem("temporary_cart_token");
    // window.localStorage.removeItem("temporary_discount_code");
  }, 2500);
}

function applyDiscount(smileSelectedDiscount) {
  // console.log('apply code', smileSelectedDiscount)
  if(smileSelectedDiscount){
    let cartTotal = document.querySelector('.js-cart-total');
    
    if(cartTotal.querySelector(".csapp_aiod_coupan")) {
      if(!cartTotal.classList.contains("smail-discount-added")) {
        simulateAddingDiscount(cartTotal, smileSelectedDiscount)
      }
    } else {
      let options = {
        childList: true, subtree: true
      }
      observer = new MutationObserver(discountCallback);

      function discountCallback(mutations) {
        for (let mutation of mutations) {
          if (mutation.type === 'childList') {
            if (cartTotal.querySelector(".csapp_aiod_coupan")) {
              observer.disconnect();

              if(!cartTotal.classList.contains("smail-discount-added")) {
                simulateAddingDiscount(cartTotal, smileSelectedDiscount)
              }
            }
          }
        }
      }
      
      observer.observe(cartTotal, options);
    }
  }
}

// function handleFormSubmit(e) {
//   e.preventDefault();
//   e.stopPropagation();

//   const target = e.currentTarget;
//   const form = target.closest('form');
//   // const form = target.closest('form[action="/cart"]')
//   // window.localStorage.removeItem()
//   // form.submit()
// }

document.addEventListener("DOMContentLoaded", () => {
  const smileSelectedDiscount = get_cookie("discount_code");
  // console.log("smileSelectedDiscount", smileSelectedDiscount)

  if(smileSelectedDiscount && smileSelectedDiscount !== "applied") applyDiscount(smileSelectedDiscount)

  let checkDiscountInterval = setInterval(checkDiscount, 700);

  function checkDiscount() {
    const smileSelectedDiscount = get_cookie("discount_code");
    // console.log('checking for cookie', smileSelectedDiscount);

    if(smileSelectedDiscount && smileSelectedDiscount !== "applied") {
      clearInterval(checkDiscountInterval);
      applyDiscount(smileSelectedDiscount);
    }
  }

  document.addEventListener('click', function(event) {
    if (event.target.closest(".aiod_remove_code")) {
      // console.log('discount removed')
      checkDiscountInterval = setInterval(checkDiscount, 700);
      document.querySelectorAll(".js-cart-total.smail-discount-added").forEach(el => {
        el.classList.remove("smail-discount-added")
      })
    }
  }, false);

  const temporary_cart_token = window.localStorage.getItem("temporary_cart_token");
  const temporary_discount_code = window.localStorage.getItem("temporary_discount_code");

  console.log("temporary_cart_token", temporary_cart_token)
  console.log("temporary_discount_code", temporary_discount_code)
  
  if(temporary_cart_token && temporary_discount_code) {
    fetch(`${window.location.origin}/cart.js`).then(res => res.json()).then(res => {
      console.log('cart', res)
      if(res && res.token){
        if (res.token != temporary_cart_token) {
          console.log('new cart');
          window.localStorage.removeItem("temporary_cart_token");
          window.localStorage.removeItem("temporary_discount_code");
        } else {
          clearInterval(checkDiscountInterval);
          applyDiscount(temporary_discount_code);
        }
      }
    })
  }

  // const checkoutForms = document.querySelectorAll('form[action="/cart"][method="post"]');

  // checkoutForms && checkoutForms.forEach(form => {
  //   const btns = form.querySelectorAll('button[type="submit"][name="checkout"]');
  
  //   btns.forEach(btn => {
  //     btn.addEventListener("click", (e) => {
  //       handleFormSubmit(e)
  //     })
  //   })
  //   form.addEventListener("submit", (e) => {
  //     handleFormSubmit(e)
  //   })
  // })
})

