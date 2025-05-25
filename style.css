/* Basic Reset & Global Styles */
* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #000000; color: #E0E0E0; line-height: 1.5; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
.app-container { width: 100%; max-width: 480px; min-height: 100vh; background-color: #121212; /* Base background */ color: #E0E0E0; display: flex; flex-direction: column; position: relative; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.5); }

/* Screen Management */
.screen { width: 100%; height:100%; display: flex; flex-direction: column; position: absolute; top: 0; left: 0; background-color: #121212; transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; opacity: 1; transform: translateX(0); }
.screen.hidden { transform: translateX(100%); opacity: 0; pointer-events: none; z-index: -1; }
#loginSection.active { transform: translateX(0); opacity: 1; pointer-events: auto; z-index: 100; }
#mainApp.active { transform: translateX(0); opacity: 1; pointer-events: auto; z-index: 50;}
#mainApp.hidden { transform: translateX(100%);} /* mainApp slides out right when login is active */

.main-content-area { width: 100%; height:100%; display: flex; flex-direction: column; background-color: #121212; position: absolute; top: 0; left: 0; transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; }
.main-content-area.hidden { transform: translateX(100%); opacity: 0; pointer-events: none; }
.main-content-area.active-screen-view { transform: translateX(0); opacity: 1; pointer-events: auto; z-index: 10; /* Ensure active view is on top within mainApp */ }
#memberListScreen.hidden { transform: translateX(-100%); } /* Member list slides left when attendance view is active */


/* Login Section Styles */
#loginSection { background-color: #1e1e1e; justify-content: center; align-items: center; }
.login-content { width: 80%; max-width: 320px; padding: 30px; background-color: #2c2c2c; border-radius: 8px; text-align: center; }
.login-content h2 { margin-bottom: 20px; color: #fff; }
#loginSection input { width: 100%; margin: 10px 0; padding: 12px; font-size: 1rem; background: #1e1e1e; color: #fff; border: 1px solid #444; border-radius: 5px; }
.btn-primary { background-color: #4caf50; color: white; border: none; padding: 12px 15px; font-size: 1rem; border-radius: 5px; cursor: pointer; width: 100%; margin-top:10px; }
.btn-primary:hover { background-color: #45a049; }
.btn-secondary { background-color: #555; color: white; border:none; padding: 10px 15px; font-size: 0.9rem; border-radius: 5px; cursor:pointer; }
.btn-secondary.small, .btn-primary.small { padding: 8px 12px; font-size: 0.85rem;}


/* Header Styles */
.app-header { background-color: #1F1F1F; color: #FFFFFF; padding: 0 10px; display: flex; justify-content: space-between; align-items: center; height: 56px; flex-shrink: 0; border-bottom: 1px solid #333; }
.app-header .app-title { font-size: 1.15rem; font-weight: 500; text-align: center; flex-grow: 1; margin: 0 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#attendanceViewScreen .app-header .app-title { text-align: left; margin-left: 10px; } /* Specific for attendance screen */
.icon-btn { background: none; border: none; color: #FFFFFF; font-size: 1.25rem; cursor: pointer; padding: 10px; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
.icon-btn:active { background-color: rgba(255,255,255,0.1); }

/* Side Navigation */
.side-nav { position: fixed; top: 0; left: -100%; width: 80%; max-width: 300px; height: 100%; background-color: #1E1E1E; color: #E0E0E0; box-shadow: 2px 0 10px rgba(0,0,0,0.5); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1000; /* Above main content within #mainApp */ overflow-y: auto; padding-top: 20px; transform: translateX(-100%); }
.side-nav.open { transform: translateX(0); }
.nav-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 999; opacity: 0; visibility: hidden; transition: opacity 0.3s ease-in-out, visibility 0s 0.3s; }
.nav-overlay.active { opacity: 1; visibility: visible; transition: opacity 0.3s ease-in-out; }
.nav-header { padding: 20px 20px 25px 20px; text-align: left; border-bottom: 1px solid #383838; margin-bottom: 15px; }
.nav-logo-text { font-size: 1.8rem; font-weight: bold; color: #FFFFFF; line-height: 1.1; letter-spacing: 1px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); }
.close-nav-btn { position: absolute; top: 10px; right: 10px; background: none; border: none; color: #A0A0A0; font-size: 2rem; cursor: pointer; padding: 5px; }
.nav-section { margin-bottom: 20px; padding: 0 20px; }
.nav-section-title { color: #888888; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 10px; font-weight: 500; padding-left: 5px; }
.side-nav ul { list-style: none; }
.side-nav ul li a { display: flex; align-items: center; padding: 14px 5px; color: #D0D0D0; text-decoration: none; font-size: 1rem; border-radius: 4px; transition: background-color 0.2s; }
.side-nav ul li a:active { background-color: rgba(255,255,255,0.08); }
.side-nav ul li a i { margin-right: 20px; width: 24px; text-align: center; color: #909090; font-size: 1.1rem; }

/* Member/Subject List Screen */
.search-container { padding: 12px 15px; background-color: #1F1F1F; position: relative; border-bottom: 1px solid #333; flex-shrink:0; }
#memberSearchInput { width: 100%; padding: 10px 15px 10px 40px; border: 1px solid #444; border-radius: 20px; background-color: #2C2C2C; color: #E0E0E0; font-size: 1rem; }
#memberSearchInput::placeholder { color: #777; }
#memberSearchInput:focus { outline: none; border-color: #007bff; }
.search-icon-input { position: absolute; left: 30px; top: 50%; transform: translateY(-50%); color: #777; font-size: 0.9rem; }

.subject-list { flex-grow: 1; overflow-y: auto; padding: 10px 15px; background-color: #121212; } /* Removed bottom padding for ad */
.subject-item { background-color: #1E1E1E; padding: 15px; margin-top: 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background-color 0.15s; border: 1px solid #2a2a2a; }
.subject-item:first-child { margin-top: 0; }
.subject-item:active { background-color: #2f2f2f; }
.subject-item .member-info span { display: block; }
.subject-item .member-name { font-size: 1.05rem; font-weight: 500; color: #FFFFFF; }
.subject-item .member-details { font-size: 0.8rem; color: #aaa; }
.subject-item .member-actions button { background: #333; color: #ddd; border: none; padding: 6px 10px; margin-left: 5px; border-radius: 4px; font-size: 0.8rem; }
.subject-item .member-actions button.delete-btn { background: #c0392b; color: white;}


/* Modal Styles (Generic) */
.modal { display: none; position: fixed; z-index: 1005; /* High z-index for modals */ left: 0; top: 0; width: 100%; height: 100%; overflow: hidden; background-color: rgba(0,0,0,0.7); align-items: center; justify-content: center; }
.modal.active { display: flex; }
.modal-content { background-color: #2C2C2C; margin: auto; padding: 20px; border-radius: 8px; width: 90%; max-width: 360px; color: #E0E0E0; box-shadow: 0 5px 20px rgba(0,0,0,0.4); }
.modal-header-flex { display: flex; align-items: center; margin-bottom: 8px; }
.modal-icon-title { font-size: 1.4rem; color: #76ff03; margin-right: 12px; }
.modal-content h3 { font-size: 1.2rem; margin-bottom: 0; color: #FFFFFF; font-weight: 500; }
.modal-input-field { width: 100%; padding: 12px 10px; margin: 8px 0; border: none; border-bottom: 1px solid #555; border-radius: 0; background-color: transparent; color: #E0E0E0; font-size: 1rem; }
.modal-input-field:focus { outline: none; border-bottom-color: #00C853; }
.modal-actions { display: flex; justify-content: flex-end; gap: 15px; margin-top: 20px; }
.btn-dialog { padding: 8px 18px; border: none; border-radius: 4px; font-size: 0.9rem; font-weight: 500; cursor: pointer; text-transform: uppercase; transition: background-color 0.2s; }
.btn-dialog-cancel { background-color: transparent; color: #A0A0A0; }
.btn-dialog-cancel:active { color: #FFFFFF; background-color: rgba(255,255,255,0.05); }
.btn-dialog-confirm { background-color: #4caf50; color: white; } /* Making confirm button more prominent */
.btn-dialog-confirm:active { background-color: #45a049; }

/* Popup Menu (Generic) */
.popup-menu { display: none; position: absolute; background-color: #333333; box-shadow: 0 3px 15px rgba(0,0,0,0.3); border-radius: 4px; z-index: 1010; /* High z-index for popups */ min-width: 220px; padding: 8px 0; border: 1px solid #444; }
.popup-menu.active { display: block; }
.popup-menu ul { list-style: none; }
.popup-menu ul li a, .popup-menu ul li label { display: block; padding: 10px 15px; /* Adjusted padding */ color: #E0E0E0; text-decoration: none; font-size: 0.95rem; /* Adjusted font size */ white-space: nowrap; cursor: pointer; }
.popup-menu ul li a:active, .popup-menu ul li label:active { background-color: #454545; }
.popup-menu ul li a i.fa-chevron-right { float: right; margin-left: 10px; color: #888; font-size: 0.8em; line-height: inherit; }
.clear-day-label { display: flex !important; align-items: center; }
#clearDayCheckbox { margin-right: 12px; width: 16px; height: 16px; accent-color: #00C853; }


/* Attendance View Screen Specifics */
.month-navigation { display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; background-color: #1E1E1E; color: #FFFFFF; flex-shrink: 0; border-bottom: 1px solid #333; }
.btn-month-nav { background: none; border: none; color: #00C853; font-size: 0.9rem; font-weight: 500; cursor: pointer; padding: 8px 10px; border-radius: 4px; }
.btn-month-nav:active { background-color: rgba(0, 200, 83, 0.1); }
#currentMonthYear { font-size: 1.05rem; font-weight: 500; }
.calendar-container { padding: 10px; background-color: #121212; flex-grow: 1; overflow-y: auto; }
.calendar-header-days { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 0.75rem; color: #888888; padding-bottom: 8px; margin-bottom: 8px; font-weight: 500; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.calendar-day { background-color: #1E1E1E; aspect-ratio: 1 / 0.9; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.95rem; border-radius: 4px; cursor: pointer; position: relative; border: 2px solid transparent; min-height: 55px; color: #D0D0D0; transition: background-color 0.15s, border-color 0.15s; }
.calendar-day.empty { background-color: transparent; cursor: default; opacity: 0.5; }
.calendar-day.selected { border-color: #007AFF; background-color: #2a2a2a; }
.calendar-day.present-day { background-color: #2E7D32; color: #FFFFFF; }
.calendar-day.absent-day { background-color: #D32F2F; color: #FFFFFF; }
.calendar-day.half-day-status { background-color: #F57C00; color: #FFFFFF; }
.calendar-day.leave-day { background-color: #607D8B; color: #FFFFFF; } /* Added style for Leave */
.calendar-day.night-shift { /* Example: add a border or small icon for night shift */ border-left: 3px solid #03A9F4; }
.calendar-day .day-number { font-weight: 500; font-size: 1rem; }
.day-indicator { font-size: 0.65rem; margin-top: 2px; color: rgba(255,255,255,0.8); background-color: rgba(0,0,0,0.15); padding: 1px 4px; border-radius: 3px; font-weight: 500; }
.calendar-day.present-day .day-indicator, .calendar-day.absent-day .day-indicator,
.calendar-day.half-day-status .day-indicator, .calendar-day.leave-day .day-indicator {
    color: rgba(255,255,255,0.9); background-color: rgba(0,0,0,0.25);
}

.attendance-summary-container { background-color: #1E1E1E; padding: 15px; border-top: 1px solid #333; flex-shrink: 0; color: #B0B0B0; font-size: 0.85rem; }
.attendance-legend { display: flex; flex-wrap: wrap; gap: 5px 15px; margin-bottom: 10px; }
.attendance-legend span { display: flex; align-items: center; }
.legend-color { width: 10px; height: 10px; border-radius: 2px; margin-right: 6px; display: inline-block; }
.legend-color.present { background-color: #2E7D32; }
.legend-color.absent { background-color: #D32F2F; }
.legend-color.half-day { background-color: #F57C00; }
.legend-color.leave { background-color: #607D8B; }
.ot-summary { margin-bottom: 10px; }
#salaryResultsDisplay { color: #fff; font-size: 0.9em; }
.action-buttons-summary { margin-top: 10px; display: flex; gap: 10px; }

/* More Info Modal (Bottom Sheet for Attendance) */
.modal.bottom-sheet { align-items: flex-end; }
.modal.bottom-sheet .modal-content { width: 100%; max-width: 480px; margin: 0; border-radius: 12px 12px 0 0; padding: 20px; max-height: 75vh; overflow-y: auto; position: relative; }
.close-modal-btn.bottom-sheet-close { position: absolute; top: 12px; right: 15px; background: rgba(255,255,255,0.1); color: #A0A0A0; border: none; border-radius: 50%; width: 30px; height: 30px; font-size: 1.2rem; line-height: 30px; text-align: center; cursor: pointer; z-index: 10; }
.close-modal-btn.bottom-sheet-close:active { background: rgba(255,255,255,0.2); color: #FFFFFF; }
/* ... (Rest of bottom sheet styles for .info-section, etc., if needed from previous CSS) ... */

.ad-banner-placeholder {
    background-color: #000;
    text-align: center;
    padding: 10px 0;
    color: #555;
    font-size: 0.8em;
    flex-shrink: 0; /* Prevent shrinking */
    height: 50px; /* Example height */
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #333;
}