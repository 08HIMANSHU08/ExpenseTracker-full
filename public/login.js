        const myForm = document.querySelector('#my-form');
        const emailInput = document.querySelector('#email');
        const passwardInput = document.querySelector('#passward');

        myForm.addEventListener('submit', onSubmit);
           
        function onSubmit(e){
          e.preventDefault();       
          const email=emailInput.value;
          const passward=passwardInput.value;
          const inputData={
            email,
            passward,
          };
          console.log(inputData);
          axios.post("http://3.93.178.101:3000/user/login",inputData)
            .then((response)=>{
                console.log(response);
              if(response.status==200){
                alert(response.data.message);
                console.log(response.data.token);
                localStorage.setItem("token",response.data.token);
                window.location.href = "./expenseapp.html";
              }
            })
            .catch((err)=>{
              document.body.innerHTML+=`<div style="color:red;">${err.response.data.message}<div>`;
              console.log(err);
            })
            emailInput.value='';
            passwardInput.value = '';  
        } 