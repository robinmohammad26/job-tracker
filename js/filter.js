let interviewList = [];
let rejectedList = [];
let deleteItem = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

let availableJob = document.getElementById('availableJob');
let deleteBtn = document.getElementById('deleteitem');


const allItems = document.getElementById('allItem')
const interviewItem = document.getElementById('interviewItem')
const rejectedItem = document.getElementById('rejectedItem')


const allSectionItem = document.getElementById('addEvents');
const mainContainer = document.querySelector('main');
const renderingSection = document.getElementById('filterItems');



// Show Count items
function getItemCount() {
    total.innerText = allSectionItem.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    // availableJob.innerText = interviewList.length;
}

getItemCount()

// Step-2 => Toggle Btn Style

function getToggleBtn(id) {
    // Add bg for all btn
    allItems.classList.add('btn-soft', 'text-black');
    interviewItem.classList.add('btn-soft', 'text-black');
    rejectedItem.classList.add('btn-soft', 'text-black');

    // Remove any other color
    allItems.classList.remove('btn-primary', 'text-white');
    interviewItem.classList.remove('btn-primary', 'text-white');
    rejectedItem.classList.remove('btn-primary', 'text-white');

    const selectedBtn = document.getElementById(id);

    // Current status
    currentStatus = id;

    console.log(currentStatus)

    selectedBtn.classList.add('btn-primary', 'text-white');
    selectedBtn.classList.remove('btn-soft', 'text-black');


    // Current btn status
    if(id == 'interviewItem'){
        allSectionItem.classList.add('hidden');
        renderingSection.classList.remove('hidden');
        renderingInterview();
    }else if(id == 'allItem'){
        allSectionItem.classList.remove('hidden');
        renderingSection.classList.add('hidden');
    }else if(id == 'rejectedItem'){
        allSectionItem.classList.add('hidden');
        renderingSection.classList.remove('hidden');
        renderingRejected();
    }

}

// Step-3 => Get The Job Section info
mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('interview-btn')) {
        // Get the parent item
        const parentItem = event.target.parentNode.parentNode;

        // Get all info for parent
        const title = parentItem.querySelector('.card-title').innerText;
        const jobTitle = parentItem.querySelector('.job-title').innerText;
        const salary = parentItem.querySelector('.salary').innerText;
        const status = parentItem.querySelector('.apstatus').innerText;
        const description = parentItem.querySelector('.description').innerText;
        parentItem.querySelector('.apstatus').innerText = 'Interview';

        const cardInfo = {
            title,
            jobTitle,
            salary,
            status: 'Interview',
            description
        }

        const itemExist = interviewList.find(item => item.title == cardInfo.title);

        if (!itemExist) {
            interviewList.push(cardInfo)
        }

        // Remove Rejected item from interview section
        rejectedList = rejectedList.filter(item => item.title != cardInfo.title);

        if(currentStatus == 'rejectedItem'){

            renderingRejected()
        }

        getItemCount()

    }else if(event.target.classList.contains('rejected-btn')){
         // Get the parent item
        const parentItem = event.target.parentNode.parentNode;

        // Get all info for parent
        const title = parentItem.querySelector('.card-title').innerText;
        const jobTitle = parentItem.querySelector('.job-title').innerText;
        const salary = parentItem.querySelector('.salary').innerText;
        const status = parentItem.querySelector('.apstatus').innerText;
        const description = parentItem.querySelector('.description').innerText;
        parentItem.querySelector('.apstatus').innerText = 'Rejected';

        const cardInfo = {
            title,
            jobTitle,
            salary,
            status: 'Rejected',
            description
        }

        const itemExist = rejectedList.find(item => item.title == cardInfo.title);

        if (!itemExist) {
            rejectedList.push(cardInfo)
        }

         // Remove Rejected item from interview section
        interviewList = interviewList.filter(item => item.title != cardInfo.title);

        if(currentStatus == 'interviewItem'){

            renderingInterview()
        }

        getItemCount()
    }

})


// Step-4 => Rendering interView items function
function renderingInterview() {

    renderingSection.innerHTML = ''

    if(interviewList == ''){
            renderingSection.innerHTML = `
        <!-- No data found -->
                <div class="flex justify-center items-center text-center p-6 bg-white rounded-md shadow-sm">
                    <div class="flex justify-center items-center text-center flex-col space-y-3">
                        <img src="./jobs.png" alt="">
                        <h2 class="text-3xl text-[#002C5C] font-bold">No jobs available</h2>
                        <p class="text-xl font-normal">Check back soon for new job opportunities</p>
                    </div>
                </div>
    
    `
        }else{

            for (let interview of interviewList) {
                let parentDiv = document.createElement('div')
                parentDiv.className = 'flex justify-between p-6 bg-white rounded-md shadow-sm'
                parentDiv.innerHTML = `
                
                    <div class="space-y-6">
                                <h2 class="card-title">${interview.title}</h2>
                                <p class="job-title">${interview.jobTitle}</p>
                                <p class="salary">${interview.salary}</p>
                                <button id="applieyStatus" class="apstatus btn btn-soft">${interview.status}</button>
                                <p class="description">${interview.description}</p>
                                <div class="">
                                    <button id="interviewBtn"
                                        class="interview-btn btn border border-green-500 text-green-500">Interview</button>
                                    <button id="rejectedBtn" class="btn border border-red-500 text-red-500 rejected-btn">Rejected</button>
                                </div>
                            </div>
                            <div id="deleteitem">
                                <button class="interdelete-btn btn btn-soft">Delete</button>
                            </div>
                
                `
                renderingSection.appendChild(parentDiv);
            }
        }
    


}
// Step-4 => Rendering interView items function
function renderingRejected() {

    renderingSection.innerHTML =  ''

    if(rejectedList == ''){

        renderingSection.innerHTML = `
        
            <!-- No data found -->
                    <div class="flex justify-center items-center text-center p-6 bg-white rounded-md shadow-sm">
                        <div class="flex justify-center items-center text-center flex-col space-y-3">
                            <img src="./jobs.png" alt="">
                            <h2 class="text-3xl text-[#002C5C] font-bold">No jobs available</h2>
                            <p class="text-xl font-normal">Check back soon for new job opportunities</p>
                        </div>
                    </div>
        
        `
    }else{

        for (let rejected of rejectedList) {
            let parentDiv = document.createElement('div')
            parentDiv.className = 'flex justify-between p-6 bg-white rounded-md shadow-sm'
            parentDiv.innerHTML = `
            
                <div class="space-y-6">
                            <h2 class="card-title">${rejected.title}</h2>
                            <p class="job-title">${rejected.jobTitle}</p>
                            <p class="salary">${rejected.salary}</p>
                            <button id="applieyStatus" class="apstatus btn btn-soft">${rejected.status}</button>
                            <p class="description">${rejected.description}</p>
                            <div class="">
                                <button id="interviewBtn"
                                    class="interview-btn btn border border-green-500 text-green-500">Interview</button>
                                <button id="rejectedBtn" class="rejected-btn btn border border-red-500 text-red-500">Rejected</button>
                            </div>
                        </div>
                        <div id="deleteitem">
                            <button class="delete-btn btn btn-soft">Delete</button>
                        </div>
            
            `
            renderingSection.appendChild(parentDiv);
        }
    }

    


}


// Delete Items

allSectionItem.addEventListener('click',function(event){

    
    if(event.target.classList.contains('delete-btn')){
        const deleteSection = event.target.parentNode.parentNode;

        const parent = deleteSection.parentNode;
        parent.removeChild(deleteSection)
        getItemCount()
        
    }
    
})
// deleteBtn.addEventListener('click',function(event){
    
//     if(event.target.classList.contains('interdelete-btn')){
//         const deleteSection = event.target.parentNode.parentNode;
//         const parent = deleteSection.parentNode;
//         parent.removeChild(deleteSection)
//         console.log('Interview delete btn working',deleteSection)
//     }
    
// })