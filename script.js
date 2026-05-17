document.addEventListener("DOMContentLoaded", () => {
    
    let members = [];

    const btnToggleForm = document.getElementById("btn-toggle-form");
    const btnDeleteLast = document.getElementById("btn-delete-last");
    const btnCancel = document.getElementById("btn-cancel");
    const totalCountText = document.getElementById("total-count");
    const formSection = document.getElementById("form-section");
    const addLionForm = document.getElementById("add-lion-form");
    const summaryGrid = document.getElementById("summary-grid");
    const detailList = document.getElementById("detail-list");

    function parseInitialDOM() {
        const initialCards = summaryGrid.querySelectorAll(".summary-card");
        initialCards.forEach((card) => {
            members.push({
                name: card.querySelector("h3").textContent.trim(),
                part: card.querySelector(".part").textContent.trim(),
                desc: card.querySelector(".desc").textContent.trim()
            });
        });
        refreshCount();
    }

    function refreshCount() {
        totalCountText.textContent = `총 ${members.length}명`;
    }

    btnToggleForm.addEventListener("click", () => {
        formSection.classList.toggle("hidden");
    });

    btnCancel.addEventListener("click", () => {
        formSection.classList.add("hidden");
        addLionForm.reset();
    });

    addLionForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const name = document.getElementById("input-name").value.trim();
        const part = document.getElementById("select-part").value;
        const skillsInput = document.getElementById("input-skills").value;
        const desc = document.getElementById("input-desc").value.trim();
        const intro = document.getElementById("input-intro").value.trim();
        const email = document.getElementById("input-email").value.trim();
        const phone = document.getElementById("input-phone").value.trim();
        const website = document.getElementById("input-website").value.trim();
        const msg = document.getElementById("input-msg").value.trim();

        const skills = skillsInput.split(",").map(s => s.trim()).filter(s => s.length > 0);
        const primarySkill = skills.length > 0 ? skills[0] : "Code";

        members.push({ name, part, desc });

        const summaryCard = document.createElement("div");
        summaryCard.className = "summary-card";

        let partClass = "front";
        if (part === "Backend") partClass = "back";
        if (part === "Design") partClass = "design";

        const colorIndex = (members.length % 9) + 1;

        summaryCard.innerHTML = `
            <div class="image-wrapper">
                <div class="placeholder-img color-${colorIndex}"></div>
                <span class="badge">${primarySkill}</span>
            </div>
            <div class="card-info">
                <h3>${name}</h3>
                <p class="part ${partClass}">${part}</p>
                <p class="desc">${desc}</p>
            </div>
        `;
        summaryGrid.appendChild(summaryCard);

        const detailCard = document.createElement("article");
        detailCard.className = "detail-card";

        const skillListHTML = skills.map(skill => `<li>${skill}</li>`).join("");

        detailCard.innerHTML = `
            <header class="detail-header">
                <h2>${name}</h2>
                <p class="part-text">${part}</p>
                <p class="track-text">LION TRACK</p>
            </header>
            <div class="detail-body">
                <h3>자기소개</h3>
                <p>${intro}</p>
                
                <h3>연락처</h3>
                <ul class="info-bullet-list">
                    <li>Email: ${email}</li>
                    <li>Phone: ${phone}</li>
                    <li><a href="${website}" target="_blank">${website}</a></li>
                </ul>
                
                <h3>관심 기술</h3>
                <ul class="info-bullet-list">${skillListHTML}</ul>
                
                <h3>한 마디</h3>
                <p>${msg}</p>
            </div>
        `;
        detailList.appendChild(detailCard);

        refreshCount();
        addLionForm.reset();
        formSection.classList.add("hidden");
    });

    btnDeleteLast.addEventListener("click", () => {
        if (members.length === 0) {
            alert("삭제할 아기 사자가 더 이상 없습니다.");
            return;
        }

        members.pop();

        const lastSummary = summaryGrid.querySelector(".summary-card:last-child");
        const lastDetail = detailList.querySelector(".detail-card:last-child");

        if (lastSummary) lastSummary.remove();
        if (lastDetail) lastDetail.remove();

        refreshCount();
    });

    parseInitialDOM();
});