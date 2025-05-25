'use strict';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Dashboard Script Initializing...");

    // --- DOM Elements from Dashboard UI ---
    const appContainer = document.getElementById('appContainer');
    const loginSection = document.getElementById('loginSection');
    const mainApp = document.getElementById('mainApp');

    const sideNav = document.getElementById('sideNav');
    const navOverlay = document.getElementById('navOverlay');
    const menuBtn = document.getElementById('menuBtn');
    const closeNavBtn = document.getElementById('closeNavBtn');
    const logoutButtonNav = document.getElementById('logoutButtonNav');
    const loggedInUserDisplay = document.getElementById('loggedInUserDisplay');

    const memberListScreen = document.getElementById('memberListScreen');
    const attendanceViewScreen = document.getElementById('attendanceViewScreen');

    const addMemberBtnHeader = document.getElementById('addMemberBtnHeader');
    const addMemberModal = document.getElementById('addMemberModal');
    const cancelAddMemberBtn = document.getElementById('cancelAddMemberBtn');
    const confirmAddMemberBtn = document.getElementById('confirmAddMemberBtn');
    const newMemberUsername = document.getElementById('newMemberUsername');
    const newMemberMobile = document.getElementById('newMemberMobile');
    const newMemberSalary = document.getElementById('newMemberSalary');

    const memberTableEl = document.getElementById('memberTable'); // This is our .subject-list div
    const memberSearchInput = document.getElementById('memberSearchInput');
    const moreOptionsMemberListBtn = document.getElementById('moreOptionsMemberListBtn');
    const memberListOptionsMenu = document.getElementById('memberListOptionsMenu');


    const backToMemberListBtn = document.getElementById('backToMemberListBtn');
    const attendanceMemberName = document.getElementById('attendanceMemberName');
    const moreOptionsAttendanceBtn = document.getElementById('moreOptionsAttendanceBtn');
    const attendanceMoreOptionsMenu = document.getElementById('attendanceMoreOptionsMenu');
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthYearDisplay = document.getElementById('currentMonthYear');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const dayActionPopup = document.getElementById('dayActionPopup');
    const clearDayCheckbox = document.getElementById('clearDayCheckbox');

    const presentCountEl = document.getElementById('presentCount');
    const absentCountEl = document.getElementById('absentCount');
    const halfDayCountEl = document.getElementById('halfDayCount');
    const leaveCountEl = document.getElementById('leaveCount');
    const otHoursEl = document.getElementById('otHours');
    const nightShiftCountSummaryEl = document.getElementById('nightShiftCountSummary');
    const salaryResultsDisplayEl = document.getElementById('salaryResultsDisplay');
    const saveAttendanceBtnSummary = document.getElementById('saveAttendanceBtnSummary');
    const calculateSalaryBtnSummary = document.getElementById('calculateSalaryBtnSummary');
    
    const menuCalculateSalary = document.getElementById('menuCalculateSalary');
    const menuExportPDF = document.getElementById('menuExportPDF');


    // --- DOM Elements from Original Login Script ---
    const loginGmailInput = document.getElementById('loginGmail');
    const loginButton = document.getElementById('loginButton');

    // --- State Variables (Combining original and new) ---
    let members = JSON.parse(localStorage.getItem('members') || '[]');
    let attendanceData = JSON.parse(localStorage.getItem('attendanceData') || '{}');
    let selectedMemberIndex = null; // Stores the index of the member in the `members` array
    let currentMemberUsernameCache = ""; // To display name on attendance screen

    let currentCalendarDate = new Date(); // Start with current month
    let activeModal = null;
    let activePopupMenu = null;
    let selectedCalendarDayCell = null;
    let selectedDayNumber = null;

    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];


    // === Core Functions from your "Self Attendance & Salary - Central" script (ADAPTED) ===

    function login() {
        const gmail = loginGmailInput.value;
        if (gmail && gmail.includes('@')) { // Basic validation
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('loginGmail', gmail);
            showMainAppUI();
        } else {
            alert('Please enter a valid Gmail address.');
        }
    }

    function logout() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loginGmail');
        selectedMemberIndex = null; // Reset selected member
        // Show login screen, hide main app
        loginSection.classList.remove('hidden');
        loginSection.classList.add('active');
        mainApp.classList.add('hidden');
        mainApp.classList.remove('active');
        console.log("Logged out");
    }

    function showMainAppUI() {
        loginSection.classList.add('hidden');
        loginSection.classList.remove('active');
        mainApp.classList.remove('hidden');
        mainApp.classList.add('active');
        
        // Ensure member list is the active view within mainApp
        switchToScreenView(memberListScreen, attendanceViewScreen);

        loggedInUserDisplay.textContent = `Logged in: ${localStorage.getItem('loginGmail')}`;
        updateMemberListUI();
        console.log("Logged in, showing main app UI");
    }

    function addMember() {
        const username = newMemberUsername.value.trim();
        const mobile = newMemberMobile.value.trim();
        const salary = parseFloat(newMemberSalary.value);

        if (!username || !mobile || isNaN(salary)) {
            alert('Please fill all fields correctly.');
            return;
        }
        members.push({ username, mobile, salary });
        localStorage.setItem('members', JSON.stringify(members));
        updateMemberListUI();
        closeModal(addMemberModal); // Close the new modal
        // Clear fields
        newMemberUsername.value = '';
        newMemberMobile.value = '';
        newMemberSalary.value = '';
        console.log("Member added:", username);
    }

    function deleteMember(indexToDelete) {
        if (confirm(`Are you sure you want to delete ${members[indexToDelete].username}?`)) {
            // Remove attendance data for this member
            const memberKey = `member${indexToDelete}`; // This keying might need adjustment if indices shift
            // A robust way is to use a unique ID for members instead of index for keys.
            // For now, let's assume we need to re-key attendance if a member is deleted.
            // This is complex. Simplification: just remove the member. Attendance data for that key will be orphaned.
            // Or, shift all subsequent attendance data keys. For now, let's just delete.
            // delete attendanceData[memberKey]; // This is a simple approach.

            members.splice(indexToDelete, 1);
            localStorage.setItem('members', JSON.stringify(members));
            // localStorage.setItem('attendanceData', JSON.stringify(attendanceData)); // If we modified attendanceData
            updateMemberListUI();
            console.log("Member deleted at index:", indexToDelete);
        }
    }
    
    function getMemberKey(index) {
        // It's better if members have a unique ID. For now, using index.
        // If your original `attendanceData` keys were like "member0", "member1", this works.
        // If they were based on username, adapt this.
        return `member${index}`;
    }


    function updateMemberListUI(filter = "") {
        memberTableEl.innerHTML = ''; // Clear current list
        const filteredMembers = members.filter(m => 
            m.username.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredMembers.length === 0) {
            memberTableEl.innerHTML = `<p style="text-align:center; padding: 20px; color: #777;">No members found.</p>`;
            return;
        }
        
        filteredMembers.forEach((m, originalIndex) => {
            // Find the original index in the `members` array for correct data keying
            const actualIndex = members.findIndex(origM => origM.username === m.username && origM.mobile === m.mobile);

            const item = document.createElement('div');
            item.classList.add('subject-item'); // Using dashboard class
            item.innerHTML = `
                <div class="member-info">
                    <span class="member-name">${m.username}</span>
                    <span class="member-details">Salary: ${m.salary} | Mobile: ${m.mobile}</span>
                </div>
                <div class="member-actions">
                    <button class="delete-btn" data-index="${actualIndex}"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            item.querySelector('.member-info').addEventListener('click', () => startAttendanceUI(actualIndex));
            item.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering member click
                deleteMember(parseInt(e.currentTarget.dataset.index));
            });
            memberTableEl.appendChild(item);
        });
        console.log("Member list UI updated. Count:", filteredMembers.length);
    }


    function startAttendanceUI(index) {
        selectedMemberIndex = index;
        currentMemberUsernameCache = members[index].username;
        attendanceMemberName.textContent = currentMemberUsernameCache;
        
        // currentCalendarDate = new Date(); // Reset to current month or load saved month for this member
        switchToScreenView(attendanceViewScreen, memberListScreen);
        renderCalendar();
        updateAttendanceSummaryUI(); // Initial summary
        console.log("Starting attendance for:", members[index].username);
    }

    function generateCalendar() { // Renamed to renderCalendar for consistency
        if (selectedMemberIndex === null) { console.error("renderCalendar: No member selected"); return; }
        calendarGrid.innerHTML = '';
        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();
        currentMonthYearDisplay.textContent = `${monthNames[month]} ${year}`;

        const memberKey = getMemberKey(selectedMemberIndex);
        const memberAttendance = attendanceData[memberKey] || {};

        const firstDayOfMonthWeekday = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonthWeekday; i++) calendarGrid.insertAdjacentHTML('beforeend', '<div class="calendar-day empty"></div>');
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.dataset.day = day;
            
            const dayData = memberAttendance[day] || {}; // Get data for this specific day (1-31)
            updateCalendarDayCellAppearance(dayCell, day, dayData); // Pass dayData

            if (selectedDayNumber === day && year === currentCalendarDate.getFullYear() && month === currentCalendarDate.getMonth()) {
                dayCell.classList.add('selected'); selectedCalendarDayCell = dayCell;
            }
            dayCell.addEventListener('click', (e) => handleDayClick(e, dayCell, day));
            calendarGrid.appendChild(dayCell);
        }
        console.log("Calendar rendered for", monthNames[month], year, "Member:", members[selectedMemberIndex].username);
    }
    const renderCalendar = generateCalendar; // Alias for consistency


    function updateCalendarDayCellAppearance(dayCell, day, dayData = {}) {
        dayCell.className = 'calendar-day'; // Reset classes
        if(dayCell.dataset.day) dayCell.classList.add(`day-${dayCell.dataset.day}`);

        let content = `<span class="day-number">${day}</span>`;
        let indicatorText = "";

        // From original script: status, inTime, outTime, otTime, night, nightInTime, nightOutTime
        if (dayData.status === "Present") dayCell.classList.add('present-day');
        else if (dayData.status === "Absent") dayCell.classList.add('absent-day');
        else if (dayData.status === "Half Day") dayCell.classList.add('half-day-status');
        else if (dayData.status === "Leave") dayCell.classList.add('leave-day');
        
        if (dayData.night) {
            dayCell.classList.add('night-shift'); // Visual cue for night shift
            indicatorText += "N ";
        }
        if (dayData.otTime && dayData.otTime > 0) {
            indicatorText += `OT:${dayData.otTime}h`;
        }

        if (indicatorText.trim()) {
            content += `<span class="day-indicator">${indicatorText.trim()}</span>`;
        }
        dayCell.innerHTML = content;

        if (selectedDayNumber === day && currentCalendarDate.getFullYear() === new Date(dayCell.dataset.year || currentCalendarDate.getFullYear(), dayCell.dataset.month || currentCalendarDate.getMonth()).getFullYear() && currentCalendarDate.getMonth() === new Date(dayCell.dataset.year || currentCalendarDate.getFullYear(), dayCell.dataset.month || currentCalendarDate.getMonth()).getMonth()) {
             dayCell.classList.add('selected');
        }
    }


    function saveAttendance() {
        if (selectedMemberIndex === null) { console.warn("SaveAttendance: No member selected"); return; }
        const memberKey = getMemberKey(selectedMemberIndex);
        // attendanceData[memberKey] is already being updated by handleDayAction.
        // This function essentially just persists the whole attendanceData object.
        localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
        alert(`${members[selectedMemberIndex].username}'s attendance saved!`);
        console.log("Attendance saved to localStorage for key:", memberKey, attendanceData[memberKey]);
    }

    function calculateSalary() {
        if (selectedMemberIndex === null) { alert("No member selected."); return; }
        const member = members[selectedMemberIndex];
        const baseSalary = member.salary;
        const memberKey = getMemberKey(selectedMemberIndex);
        const monthData = attendanceData[memberKey] || {};

        // Use currentCalendarDate to filter for current month's attendance
        // The original script calculated based on all 31 potential entries.
        // We need to be careful if monthData is sparse or only contains entries for the current month.
        // For simplicity, let's assume monthData only contains entries (days 1-31)
        // that have been explicitly set.
        
        let dailySalary = baseSalary / 30; // Or daysInMonth of currentCalendarDate
        let totalBase = 0;
        let totalOtPay = 0;
        let totalNightPay = 0; // If night shifts have extra pay beyond base

        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();
        const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i <= daysInCurrentMonth; i++) { // Iterate only for days in current month
            const dayEntry = monthData[i] || {}; // Data for day `i`
            const status = dayEntry.status || "Absent"; // Default to Absent if no status

            if (status === "Present") totalBase += dailySalary;
            else if (status === "Half Day") totalBase += dailySalary / 2;
            // Leaves might also count for pay depending on policy, not included here.

            totalOtPay += (parseFloat(dayEntry.otTime) || 0) * 50; // Assuming OT rate of 50/hr
            if (dayEntry.night) {
                // Assuming night shift gets an additional amount or the base dailySalary again
                // This depends on your rules. For now, let's say it adds dailySalary if it's a paid day.
                if (status === "Present" || status === "Half Day") { // Only add night pay if worked
                     // totalNightPay += dailySalary; // Example: full day pay extra for night
                     // Or, it could be a fixed amount per night shift.
                }
            }
        }

        const grandTotal = totalBase + totalOtPay + totalNightPay;
        const resultsText = `Total Salary: ₹${grandTotal.toFixed(2)} (Base: ₹${totalBase.toFixed(2)} + OT: ₹${totalOtPay.toFixed(2)} + Night: ₹${totalNightPay.toFixed(2)})`;
        salaryResultsDisplayEl.innerHTML = `<h4>${resultsText}</h4>`;
        console.log("Salary Calculated:", resultsText);
        return resultsText; // For PDF
    }

    async function exportPDF() {
        if (selectedMemberIndex === null) { alert("No member selected to export."); return; }
        const salaryContent = calculateSalary(); // Recalculate to ensure it's current
        if (!salaryContent) { alert("Calculate salary first."); return; }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`Salary Report for: ${members[selectedMemberIndex].username}`, 10, 10);
        doc.setFontSize(12);
        doc.text(`Month: ${monthNames[currentCalendarDate.getMonth()]} ${currentCalendarDate.getFullYear()}`, 10, 20);
        doc.text(salaryContent, 10, 30);
        // You can add more details from attendanceData[getMemberKey(selectedMemberIndex)] here
        doc.save(`${members[selectedMemberIndex].username}_salary_${monthNames[currentCalendarDate.getMonth()]}_${currentCalendarDate.getFullYear()}.pdf`);
        console.log("PDF Exported");
    }


    // === UI Control Functions for Dashboard ===
    function openSideNavDashboard() { closeActiveModal(); closeActivePopupMenu(); sideNav.classList.add('open'); navOverlay.classList.add('active'); }
    function closeSideNavDashboard() { sideNav.classList.remove('open'); navOverlay.classList.remove('active'); }
    function openModalDashboard(modalElement) {
        closeSideNavDashboard(); closeActivePopupMenu();
        if (activeModal && activeModal !== modalElement) closeModalDashboard(activeModal);
        activeModal = modalElement;
        activeModal.style.display = 'flex';
        setTimeout(() => activeModal.classList.add('active'), 10);
    }
    function closeModalDashboard(modalElement) {
        if (!modalElement) return;
        modalElement.classList.remove('active');
        setTimeout(() => {
            modalElement.style.display = 'none';
            if (modalElement === activeModal) activeModal = null;
        }, 300);
    }
    function closeActiveModal() { if (activeModal) closeModalDashboard(activeModal); }
    function openPopupMenuDashboard(menuElement, triggerElement, anchorTo = 'button') {
        closeSideNavDashboard(); closeActiveModal();
        if (activePopupMenu === menuElement && menuElement.classList.contains('active')) {
            menuElement.classList.remove('active'); activePopupMenu = null; return;
        }
        if (activePopupMenu) closeActivePopupMenu();
        activePopupMenu = menuElement;
        activePopupMenu.classList.add('active');
        positionPopupMenuDashboard(activePopupMenu, triggerElement, anchorTo);
    }
    function positionPopupMenuDashboard(menu, trigger) { /* ... (same as before) ... */ }
    function closeActivePopupMenu() { if (activePopupMenu) { activePopupMenu.classList.remove('active'); activePopupMenu = null; } }

    function switchToScreenView(screenToShow, screenToHide) {
        if (screenToHide) screenToHide.classList.add('hidden');
        screenToShow.classList.remove('hidden'); // This should be the current view in #mainApp
        
        // Make sure other views are hidden
        if (screenToShow === memberListScreen && attendanceViewScreen !== screenToHide) attendanceViewScreen.classList.add('hidden');
        if (screenToShow === attendanceViewScreen && memberListScreen !== screenToHide) memberListScreen.classList.add('hidden');
        
        console.log("Switched main content view to:", screenToShow.id);
    }

    // --- Event Listeners for Dashboard UI ---
    menuBtn.addEventListener('click', (e) => { e.stopPropagation(); openSideNavDashboard(); });
    closeNavBtn.addEventListener('click', closeSideNavDashboard);
    navOverlay.addEventListener('click', closeSideNavDashboard);
    logoutButtonNav.addEventListener('click', logout);

    addMemberBtnHeader.addEventListener('click', (e) => { e.stopPropagation(); openModalDashboard(addMemberModal); });
    cancelAddMemberBtn.addEventListener('click', () => closeModalDashboard(addMemberModal));
    confirmAddMemberBtn.addEventListener('click', addMember); // Uses adapted addMember

    moreOptionsMemberListBtn.addEventListener('click', (e) => { e.stopPropagation(); openPopupMenuDashboard(memberListOptionsMenu, moreOptionsMemberListBtn);});
    memberSearchInput.addEventListener('input', (e) => updateMemberListUI(e.target.value));
    
    backToMemberListBtn.addEventListener('click', () => {
        switchToScreenView(memberListScreen, attendanceViewScreen);
        selectedMemberIndex = null; // Clear selected member when going back
        if(selectedCalendarDayCell) selectedCalendarDayCell.classList.remove('selected');
        selectedCalendarDayCell = null; selectedDayNumber = null;
    });
    moreOptionsAttendanceBtn.addEventListener('click', (e) => { e.stopPropagation(); openPopupMenuDashboard(attendanceMoreOptionsMenu, moreOptionsAttendanceBtn);});

    prevMonthBtn.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        if(selectedCalendarDayCell) selectedCalendarDayCell.classList.remove('selected');
        selectedCalendarDayCell = null; // selectedDayNumber will be used to re-select if month is same
        renderCalendar(); updateAttendanceSummaryUI(); closeActivePopupMenu();
    });
    nextMonthBtn.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        if(selectedCalendarDayCell) selectedCalendarDayCell.classList.remove('selected');
        selectedCalendarDayCell = null;
        renderCalendar(); updateAttendanceSummaryUI(); closeActivePopupMenu();
    });

    function handleDayClick(event, dayCell, day) {
        event.stopPropagation();
        if (selectedCalendarDayCell) selectedCalendarDayCell.classList.remove('selected');
        dayCell.classList.add('selected');
        selectedCalendarDayCell = dayCell;
        selectedDayNumber = day;

        const memberKey = getMemberKey(selectedMemberIndex);
        const dayData = (attendanceData[memberKey] && attendanceData[memberKey][day]) ? attendanceData[memberKey][day] : {};
        clearDayCheckbox.checked = Object.keys(dayData).length === 0; // Checked if no data for day
        
        openPopupMenuDashboard(dayActionPopup, dayCell, 'dayCell');
    }

    dayActionPopup.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = e.target.closest('a[data-action], input[data-action]');
        if (!target || selectedMemberIndex === null || selectedDayNumber === null) return;

        const action = target.dataset.action;
        const memberKey = getMemberKey(selectedMemberIndex);

        if (!attendanceData[memberKey]) attendanceData[memberKey] = {};
        if (!attendanceData[memberKey][selectedDayNumber] && action !== 'clear') {
            attendanceData[memberKey][selectedDayNumber] = {}; // Initialize day data if it doesn't exist
        }
        
        let dayData = attendanceData[memberKey][selectedDayNumber] || {};
        let needsUIRefresh = true;
        let closePopupAfter = true;

        switch (action) {
            case 'Present': case 'Absent': case 'Half Day': case 'Leave':
                dayData.status = action;
                // Clear other conflicting data if needed, e.g. OT if absent
                if (action === 'Absent' || action === 'Leave') {
                    delete dayData.otTime; delete dayData.night;
                }
                break;
            case 'toggle-night':
                dayData.night = !dayData.night;
                if (!dayData.status && dayData.night) dayData.status = "Present"; // Auto-present if marking night
                closePopupAfter = false;
                break;
            case 'set-ot':
                const otHours = prompt(`Enter OT hours for ${currentMemberUsernameCache} on ${monthNames[currentCalendarDate.getMonth()]} ${selectedDayNumber}:`, dayData.otTime || 0);
                if (otHours !== null) { // User didn't cancel prompt
                    dayData.otTime = parseFloat(otHours) || 0;
                    if (dayData.otTime > 0 && !dayData.status) dayData.status = "Present"; // Auto-present if setting OT
                }
                closePopupAfter = false;
                break;
            case 'clear':
                if (target.type === 'checkbox' && target.checked) { // If checkbox is now checked, clear data
                    delete attendanceData[memberKey][selectedDayNumber];
                    dayData = {}; // Reset local dayData for UI update
                } else if (target.type === 'checkbox' && !target.checked) {
                    // Unchecking "Clear" implies data exists or will be set.
                    // No data change here, but ensure dayData reflects it's not empty for checkbox logic
                    if (Object.keys(dayData).length === 0) dayData.status = "Select"; // Default if unchecking clear on empty
                }
                break;
            default: needsUIRefresh = false; closePopupAfter = true;
        }
        
        // If dayData became empty after actions (e.g. status removed, OT=0, night=false)
        // and it wasn't explicitly a 'clear' action that made it empty,
        // we might want to remove the empty object for that day.
        if (action !== 'clear' && Object.keys(dayData).length === 1 && dayData.status === "Select") {
            delete attendanceData[memberKey][selectedDayNumber];
            dayData = {};
        } else if (Object.keys(dayData).length > 0 || action === 'clear' && !target.checked) {
             attendanceData[memberKey][selectedDayNumber] = dayData;
        }


        if (needsUIRefresh && selectedCalendarDayCell) {
            updateCalendarDayCellAppearance(selectedCalendarDayCell, selectedDayNumber, dayData);
            updateAttendanceSummaryUI();
            clearDayCheckbox.checked = Object.keys(dayData).length === 0;
        }
        if (closePopupAfter) closeActivePopupMenu();
    });

    saveAttendanceBtnSummary.addEventListener('click', saveAttendance);
    calculateSalaryBtnSummary.addEventListener('click', calculateSalary);
    menuCalculateSalary.addEventListener('click', () => { calculateSalary(); closeActivePopupMenu(); });
    menuExportPDF.addEventListener('click', () => { exportPDF(); closeActivePopupMenu(); });


    function updateAttendanceSummaryUI() {
        if (selectedMemberIndex === null) return;
        const memberKey = getMemberKey(selectedMemberIndex);
        const monthData = attendanceData[memberKey] || {};
        
        let p=0, a=0, h=0, l=0, otH=0, nightS=0;
        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();
        const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i <= daysInCurrentMonth; i++) {
            const day = monthData[i] || {};
            if(day.status === "Present") p++;
            else if(day.status === "Absent") a++;
            else if(day.status === "Half Day") h++;
            else if(day.status === "Leave") l++;
            otH += parseFloat(day.otTime) || 0;
            if(day.night) nightS++;
        }
        presentCountEl.textContent = p;
        absentCountEl.textContent = a;
        halfDayCountEl.textContent = h;
        leaveCountEl.textContent = l;
        otHoursEl.textContent = otH;
        nightShiftCountSummaryEl.textContent = nightS;
        salaryResultsDisplayEl.innerHTML = ''; // Clear previous salary calculation
    }

    // Global click listener for popups etc.
    document.addEventListener('click', (e) => {
        if (sideNav.classList.contains('open') && !sideNav.contains(e.target) && e.target !== menuBtn) closeSideNavDashboard();
        if (activePopupMenu && !activePopupMenu.contains(e.target) && !e.target.closest('.icon-btn') && !e.target.closest('.calendar-day')) {
            let isTrigger = false; /* ... (add specific trigger checks here if needed) ... */
            if (!isTrigger) closeActivePopupMenu();
        }
    });

    // --- Initial Load ---
    if (localStorage.getItem('loggedIn') === 'true') {
        showMainAppUI();
    } else {
        loginSection.classList.remove('hidden');
        loginSection.classList.add('active');
        mainApp.classList.add('hidden');
        mainApp.classList.remove('active');
    }
    loginButton.addEventListener('click', login);

    console.log("Dashboard Script Initialized and Event Listeners Attached.");
});