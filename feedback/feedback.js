document.addEventListener("DOMContentLoaded",function(){
    
    document.getElementById('preview').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
    
        let isValid = true;
    
        // Name validation
        const name = document.getElementById('name').value;
        if (name === '') {
            isValid = false;
            document.getElementById('nameError').innerText = 'Name is required.';
            document.getElementById('nameError').style.color = "Red";
        } else {
            document.getElementById('nameError').innerText = '';
        }
    
        // Email validation
        const email = document.getElementById('email').value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailPattern.test(email)) {
            isValid = false;
            document.getElementById('emailError').innerText = 'Valid email is required.';
            document.getElementById('emailError').style.color = 'Red';
        } else {
            document.getElementById('emailError').innerText = '';
        }
    
        // First Visit validation
        const firstVisit = document.querySelector('input[name="firstVisit"]:checked');
        console.log("ff - "+ firstVisit.value)
        if (!firstVisit) {
            isValid = false;
            document.getElementById('firstVisitError').innerText = 'Please select an option.';
            document.getElementById('firstVisitError').style.color = 'Red';
        } else {
            document.getElementById('firstVisitError').innerText = '';
        }
    
        // Informative validation
        const informative = document.querySelector('input[name="informative"]:checked');
        if (!informative) {
            isValid = false;
            document.getElementById('informativeError').innerText = 'Please select an option.';
            document.getElementById('informativeError').style.color = 'red';
        } else {
            document.getElementById('informativeError').innerText = '';
        }
    
        // Rating validation
        const rating = document.getElementById('rating').value;
        if (rating === '' || rating < 1 || rating > 10) {
            isValid = false;
            document.getElementById('ratingError').innerText = 'Rating must be between 1 and 10.';
            document.getElementById('ratingError').style.color = 'red';
        } else {
            document.getElementById('ratingError').innerText = '';
        }
    
        // Recommend validation
        const recommend = document.querySelector('input[name="recommend"]:checked');
        if (!recommend) {
            isValid = false;
            document.getElementById('recommendError').innerText = 'Please select an option.';
            document.getElementById('recommendError').style.color= 'red';
        } else {
            document.getElementById('recommendError').innerText = '';
        }
    
        // If the form is valid, show the form preview 
        if (isValid) {
            let mainForm = document.getElementById("feedbackForm");
            let previewForm = document.getElementById("previewSection")
            mainForm.style.display = "none";
            previewForm.style.display = "block";

            document.getElementById("previewName").innerHTML = name;
            document.getElementById("previewEmail").innerHTML = email;
            document.getElementById("previewFirstVisit").innerHTML = firstVisit.value;
            document.getElementById("previewInformative").innerHTML = informative.value;
            document.getElementById("previewImprovements").innerHTML = document.getElementById("improvements").value;
            document.getElementById("previewRating").innerHTML = rating;
            document.getElementById("previewRecommend").innerHTML = recommend.value;
            document.getElementById("previewQuestions").innerHTML = document.getElementById("questions").value;
            
            document.getElementById("edit").addEventListener("click",function (event){
                let mainForm = document.getElementById("feedbackForm");
                let previewForm = document.getElementById("previewSection")
                mainForm.style.display = "block";
                previewForm.style.display = "none";
            })

            document.getElementById("submit").addEventListener("click",function (event){
                alert("Feedback submitted successfully")
            })
            
        }
        
    });
})



