document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointmentForm");

  form.addEventListener("submit", function (e) {
      e.preventDefault(); 

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const date = document.getElementById("date").value;


      let errors = [];


      if (name === "") {
          errors.push("يرجى إدخال الاسم.");
      }

      if (email !== "") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
              errors.push("يرجى إدخال بريد إلكتروني صحيح.");
          }
      }


      const phoneRegex = /^[0-9]{11}$/;
      if (!phoneRegex.test(phone)) {
          errors.push("يرجى إدخال رقم هاتف صحيح يحتوي على 11 رقم فقط.");
      }


      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); 

      if (!date || selectedDate < today) {
          errors.push("يرجى اختيار تاريخ صحيح (لاحق أو مساوي لليوم).هذا تاريخ الحجز");
      }

      
      if (errors.length > 0) {
          alert(errors.join("\n"));
      } else {
          alert("تم إرسال الموعد بنجاح!");
          form.reset(); 
      }
  });
});
