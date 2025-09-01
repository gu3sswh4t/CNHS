import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// MODIFIED: Imported new functions from auth and database
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getDatabase, ref, set, get, push, remove, onValue, serverTimestamp, runTransaction, update } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyArVK4JdqGYYMk2rlOLcwenCBzJIWOVYg8",
    authDomain: "igacoslr.firebaseapp.com",
    projectId: "igacoslr",
    storageBucket: "igacoslr.appspot.com",
    messagingSenderId: "168499425895",
    appId: "1:168499425895:web:1e32d9d1c8f52887f0dac2"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// ADDED: SVG icons for password toggle
const eyeIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`;
const eyeSlashIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" /></svg>`;

const DOMElements = {
    loader: document.getElementById('loader'),
    toastContainer: document.getElementById('toastContainer'),
    currentYear: document.getElementById("currentYear"),
    themeToggle: document.getElementById('theme-toggle'),
    mainLogo: document.getElementById('mainLogo'),
    logoutBtn: document.getElementById('logoutBtn'),
    changePasswordBtn: document.getElementById('changePasswordBtn'),
    systemOverviewBtn: document.getElementById('systemOverviewBtn'),
    currentUserIdContainer: document.getElementById('currentUserIdContainer'),
    currentUserId: document.getElementById('currentUserId'),
    landingPage: document.getElementById('landingPage'),
    loginBtn: document.getElementById('loginBtn'),
    studentAccessBtn: document.getElementById('studentAccessBtn'),
    authSection: document.getElementById('authSection'),
    backToLandingBtn: document.getElementById('backToLandingBtn'),
    loginForm: document.getElementById('loginForm'),
    loginEmail: document.getElementById('loginEmail'),
    loginPassword: document.getElementById('loginPassword'),
    adminPanel: document.getElementById('adminPanel'),
    systemAdminPanel: document.getElementById('systemAdminPanel'),
    userManagementContainer: document.getElementById('userManagementContainer'),
    userSearchInput: document.getElementById('userSearchInput'),
    contentManagementForm: document.getElementById('contentManagementForm'),
    pageContentSelect: document.getElementById('pageContentSelect'),
    contentEditorArea: document.getElementById('content-editor-area'),
    achievementForm: document.getElementById('achievementForm'),
    newAchievementText: document.getElementById('newAchievementText'),
    achievementsList: document.getElementById('achievementsList'),
    addLinkForm: document.getElementById('addLinkForm'),
    googleDriveShareLink: document.getElementById('googleDriveShareLink'),
    generateLinkBtn: document.getElementById('generateLinkBtn'),
    fileLinkInput: document.getElementById('fileLink'),
    linkDescriptionInput: document.getElementById('linkDescription'),
    createUserForm: document.getElementById('createUserForm'),
    newUserEmail: document.getElementById('newUserEmail'),
    newUserPassword: document.getElementById('newUserPassword'),
    privateLinksSection: document.getElementById('privateLinksSection'),
    addPrivateLinkForm: document.getElementById('addPrivateLinkForm'),
    privateGoogleDriveShareLink: document.getElementById('privateGoogleDriveShareLink'),
    generatePrivateLinkBtn: document.getElementById('generatePrivateLinkBtn'),
    privateFileLink: document.getElementById('privateFileLink'),
    privateLinkDescription: document.getElementById('privateLinkDescription'),
    privateMaterialsTableContainer: document.getElementById('privateMaterialsTableContainer'),
    privateSearchInput: document.getElementById('privateSearchInput'),
    updatePasswordSection: document.getElementById('updatePasswordSection'),
    updatePasswordForm: document.getElementById('updatePasswordForm'),
    newPasswordInput: document.getElementById('newPasswordInput'),
    confirmNewPasswordInput: document.getElementById('confirmNewPasswordInput'),
    cancelUpdatePasswordBtn: document.getElementById('cancelUpdatePasswordBtn'),
    learningResourcesSection: document.getElementById('learningResourcesSection'),
    systemOverviewSection: document.getElementById('systemOverviewSection'),
    systemOverviewContainer: document.getElementById('systemOverviewContainer'),
    searchInput: document.getElementById("searchInput"),
    materialsTableContainer: document.getElementById('materialsTableContainer'),
    headerNav: document.getElementById('headerNav'),
    mobileNavOverlay: document.getElementById('mobileNavOverlay'),
    mobileNavLinks: document.getElementById('mobileNavLinks'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileNavCloseBtn: document.getElementById('mobileNavCloseBtn'),
    contentModal: document.getElementById('contentModal'),
    contentModalTitle: document.getElementById('contentModalTitle'),
    contentModalBody: document.getElementById('contentModalBody'),
    contentModalCloseBtn: document.getElementById('contentModalCloseBtn'),
    galleryModal: document.getElementById('galleryModal'),
    galleryImage: document.getElementById('galleryImage'),
    galleryModalCloseBtn: document.getElementById('galleryModalCloseBtn'),
    galleryPrevBtn: document.getElementById('galleryPrevBtn'),
    galleryNextBtn: document.getElementById('galleryNextBtn'),
    confirmationModal: document.getElementById('confirmationModal'),
    confirmationTitle: document.getElementById('confirmationTitle'),
    confirmationMessage: document.getElementById('confirmationMessage'),
    confirmActionBtn: document.getElementById('confirmActionBtn'),
    cancelModalBtn: document.getElementById('cancelModalBtn'),
    achievementBanner: document.getElementById('achievementBanner'),
    achievementText: document.getElementById('achievementText'),
    myClassesBtn: document.getElementById('myClassesBtn'),
    adminMyPrivateFilesBtn: document.getElementById('adminMyPrivateFilesBtn'),
    classManagementSection: document.getElementById('classManagementSection'),
    createClassForm: document.getElementById('createClassForm'),
    newClassName: document.getElementById('newClassName'),
    myClassesContainer: document.getElementById('myClassesContainer'),
    studentAccessSection: document.getElementById('studentAccessSection'),
    studentAccessForm: document.getElementById('studentAccessForm'),
    classKeyInput: document.getElementById('classKeyInput'),
    studentClassFilesContainer: document.getElementById('studentClassFilesContainer'),
    classFilesModal: document.getElementById('classFilesModal'),
    classFilesModalTitle: document.getElementById('classFilesModalTitle'),
    classFilesModalBody: document.getElementById('classFilesModalBody'),
    classFilesModalCloseBtn: document.getElementById('classFilesModalCloseBtn'),
    backFromClassesBtn: document.getElementById('backFromClassesBtn'),
    backFromStudentAccessBtn: document.getElementById('backFromStudentAccessBtn'),
    galleryTrack: document.querySelector('.gallery-track'),
    // ADDED: New DOM elements for new features
    togglePassword: document.getElementById('togglePassword'),
    forgotPasswordLink: document.getElementById('forgotPasswordLink'),
    forgotPasswordModal: document.getElementById('forgotPasswordModal'),
    forgotPasswordForm: document.getElementById('forgotPasswordForm'),
    forgotPasswordEmail: document.getElementById('forgotPasswordEmail'),
    forgotPasswordContent: document.getElementById('forgotPasswordContent'),
    resetSuccessMessage: document.getElementById('resetSuccessMessage'),
    forgotPasswordModalCloseBtn: document.getElementById('forgotPasswordModalCloseBtn'),
    editModal: document.getElementById('editModal'),
    editForm: document.getElementById('editForm'),
    editDescriptionInput: document.getElementById('editDescriptionInput'),
    editModalCloseBtn: document.getElementById('editModalCloseBtn'),
    cancelEditBtn: document.getElementById('cancelEditBtn'),
};
const AppState = {
    isAdmin: false,
    isSystemAdmin: false,
    allMaterials: [],
    privateMaterials: [],
    privateItemsToShow: 10,
    allUsers: {},
    actionHandler: null,
    repoImages: [],
    galleryImages: [],
    currentGalleryIndex: 0,
    achievements: [],
    currentAchievementIndex: 0,
    // ADDED: State for editing file
    editingFile: null,
};
const SYSTEM_ADMIN_UID = 'ei66KvfdRjakTEycf2acPG3EQo73';
const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    DOMElements.themeToggle.checked = theme === 'dark';
};
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(systemPrefersDark ? 'dark' : 'light');
    }
};
const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    DOMElements.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
};
const logAction = (action, details) => {
    const user = auth.currentUser;
    if (!user) return;
    const logRef = ref(db, 'audit_log');
    push(logRef, {
        action,
        details,
        userEmail: user.email,
        uid: user.uid,
        timestamp: serverTimestamp()
    });
};
const checkAdminStatus = async (user) => {
    if (!user) return { isAdmin: false, isSystemAdmin: false };
    const isSystemAdmin = user.uid === SYSTEM_ADMIN_UID;
    if (isSystemAdmin) return { isAdmin: true, isSystemAdmin: true };
    const adminRef = ref(db, `admins/${user.uid}`);
    const snapshot = await get(adminRef);
    const isAdmin = snapshot.exists();
    return { isAdmin, isSystemAdmin };
};
const updateUI = async () => {
    const user = auth.currentUser;
    const { isAdmin, isSystemAdmin } = await checkAdminStatus(user);
    AppState.isAdmin = isAdmin;
    AppState.isSystemAdmin = isSystemAdmin;
    const allSections = [DOMElements.landingPage, DOMElements.authSection, DOMElements.adminPanel, DOMElements.systemAdminPanel, DOMElements.learningResourcesSection, DOMElements.updatePasswordSection, DOMElements.systemOverviewSection, DOMElements.privateLinksSection, DOMElements.classManagementSection, DOMElements.studentAccessSection];
    allSections.forEach(el => el.style.display = 'none');
    DOMElements.logoutBtn.style.display = 'none';
    DOMElements.changePasswordBtn.style.display = 'none';
    DOMElements.systemOverviewBtn.style.display = 'none';
    DOMElements.myClassesBtn.style.display = 'none';
    DOMElements.adminMyPrivateFilesBtn.style.display = 'none';
    DOMElements.currentUserIdContainer.style.display = 'none';
    DOMElements.headerNav.style.display = '';
    DOMElements.mobileMenuBtn.style.display = '';

    if (user) {
        document.body.className = 'logged-in-theme';
        DOMElements.logoutBtn.style.display = 'block';
        DOMElements.changePasswordBtn.style.display = 'block';
        DOMElements.currentUserIdContainer.style.display = 'flex';

        const userEmail = user.email;
        const username = userEmail.split('@')[0];
        DOMElements.currentUserId.textContent = username;

        if (AppState.isSystemAdmin) {
            DOMElements.systemOverviewBtn.style.display = 'block';
            DOMElements.systemAdminPanel.style.display = 'block';
            fetchAllUsers();
            renderAchievementsList();
        } else if (AppState.isAdmin) {
            DOMElements.myClassesBtn.style.display = 'block';
            DOMElements.learningResourcesSection.style.display = 'block';
            DOMElements.adminPanel.style.display = 'block';
            fetchAllMaterials();
        } else {
            DOMElements.myClassesBtn.style.display = 'block';
            DOMElements.learningResourcesSection.style.display = 'block';
            DOMElements.privateLinksSection.style.display = 'block';
            fetchPublicMaterials();
            fetchPrivateMaterials(user.uid);
        }
    } else {
        document.body.className = 'logged-out-theme';
        DOMElements.landingPage.style.display = 'flex';
    }
    DOMElements.loader.classList.add('hidden');
};
const fetchPublicMaterials = () => {
    const materialsRef = ref(db, 'educationalMaterials');
    onValue(materialsRef, (snapshot) => {
        const publicMaterials = [];
        if (snapshot.exists()) {
            snapshot.forEach(child => {
                publicMaterials.push({ id: child.key, isPublic: true, ...child.val() });
            });
        }
        AppState.allMaterials = publicMaterials;
        renderAllMaterials();
    });
};
const fetchAllMaterials = async () => {
    try {
        const publicRef = ref(db, 'educationalMaterials');
        const usersRef = ref(db, 'userMaterials');
        const allUsersRef = ref(db, 'users');

        const [publicSnapshot, usersSnapshot, allUsersRefSnapshot] = await Promise.all([get(publicRef), get(usersRef), get(allUsersRef)]);

        const allUsers = allUsersRefSnapshot.exists() ? allUsersRefSnapshot.val() : {};
        AppState.allUsers = allUsers;
        let allMaterials = [];

        if (publicSnapshot.exists()) {
            publicSnapshot.forEach(child => {
                allMaterials.push({ id: child.key, isPublic: true, owner: allUsers[child.val().addedBy]?.email || 'Public', ...child.val() });
            });
        }
        if (usersSnapshot.exists()) {
            usersSnapshot.forEach(userNode => {
                userNode.forEach(child => {
                    const materialData = child.val();
                    if (!materialData.isPublic) {
                        allMaterials.push({ id: child.key, ownerId: userNode.key, owner: allUsers[userNode.key]?.email || 'Unknown', isPublic: false, ...materialData });
                    }
                });
            });
        }
        AppState.allMaterials = allMaterials;
        renderAllMaterials();
    } catch (error) {
        console.error("Error fetching all materials:", error);
        showToast('Could not load materials. Check permissions.', 'error');
        AppState.allMaterials = [];
        renderAllMaterials();
    }
};
const fetchPrivateMaterials = (userId) => {
    const materialsRef = ref(db, `userMaterials/${userId}`);
    onValue(materialsRef, (snapshot) => {
        const materials = [];
        if (snapshot.exists()) {
            snapshot.forEach(child => {
                materials.push({ id: child.key, ...child.val() });
            });
        }
        AppState.privateMaterials = materials.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        DOMElements.privateSearchInput.value = '';
        AppState.privateItemsToShow = 10;
        updateAndRenderPrivateMaterials();
    });
};
const updateAndRenderPrivateMaterials = () => {
    const searchTerm = DOMElements.privateSearchInput.value.toLowerCase();
    const filteredMaterials = AppState.privateMaterials.filter(material =>
        material.description.toLowerCase().includes(searchTerm)
    );
    const materialsToShow = filteredMaterials.slice(0, AppState.privateItemsToShow);
    renderPrivateMaterials(materialsToShow);
};
// MODIFIED: renderPrivateMaterials to include an edit button
const renderPrivateMaterials = (materials) => {
    const container = DOMElements.privateMaterialsTableContainer;
    if (DOMElements.privateSearchInput.value === '' && AppState.privateItemsToShow === 10) {
        container.scrollTop = 0;
    }
    if (materials.length === 0) {
        const message = DOMElements.privateSearchInput.value ? 'No files match your search.' : "You haven't added any private links yet.";
        container.innerHTML = `<p style="text-align: center; padding: 40px; color: var(--text-muted);">${message}</p>`;
        return;
    }
    const tableRows = materials.map(mat => {
        const date = mat.createdAt ? new Date(mat.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric'}) : 'N/A';
        return `
            <tr>
                <td class="material-description">${mat.description}</td>
                <td>${date}</td>
                <td style="text-align: right;">
                    <button class="download-btn" data-link="${mat.link}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                        <span>Download</span>
                    </button>
                </td>
                <td style="display: flex; gap: 5px; justify-content: center;">
                    <button class="edit-link-btn" data-id="${mat.id}" data-is-public="false" data-description="${mat.description}" title="Edit Description">
                        <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                    </button>
                    <button class="delete-link-btn" data-id="${mat.id}" data-description="${mat.description}" title="Delete Material">
                        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                    </button>
                </td>
            </tr>`;
    }).join('');
    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Date Added</th>
                    <th style="text-align: right;">Link</th>
                    <th style="text-align: center;">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `;
    container.innerHTML = tableHTML;
};
const fetchAllUsers = async () => {
    const usersRef = ref(db, 'users');
    const usersSnapshot = await get(usersRef);
    if(usersSnapshot.exists()){
        AppState.allUsers = usersSnapshot.val();
    }
    renderUserList();
};
const renderUserList = async (searchTerm = '') => {
    const container = DOMElements.userManagementContainer;
    container.innerHTML = '';

    const adminsRef = ref(db, 'admins');
    const adminsSnapshot = await get(adminsRef);
    const admins = adminsSnapshot.exists() ? adminsSnapshot.val() : {};

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredUserIds = Object.keys(AppState.allUsers).filter(uid =>
        AppState.allUsers[uid].email.toLowerCase().includes(lowerCaseSearchTerm)
    );

    if (filteredUserIds.length === 0) {
        container.innerHTML = '<p>No users found.</p>';
        return;
    }

    let tableHTML = '<div class="user-management-table-wrapper"><table class="data-table"><thead><tr><th>User Email</th><th>Role</th><th style="text-align:right;">Action</th></tr></thead><tbody>';
    for (const uid of filteredUserIds) {
        const user = AppState.allUsers[uid];
        const isCurrentUserAdmin = admins[uid];
        if (uid === SYSTEM_ADMIN_UID) continue;
        tableHTML += `
            <tr>
                <td class="user-email">${user.email}</td>
                <td>${isCurrentUserAdmin ? 'Admin' : 'User'}</td>
                <td style="text-align:right;">
                    ${isCurrentUserAdmin
                        ? `<button class="form-button role-toggle-btn revoke" data-uid="${uid}" data-email="${user.email}">Revoke Admin</button>`
                        : `<button class="form-button role-toggle-btn promote" data-uid="${uid}" data-email="${user.email}">Promote to Admin</button>`
                    }
                </td>
            </tr>
        `;
    }
    tableHTML += '</tbody></table></div>';
    container.innerHTML = tableHTML;
};
const renderSystemOverview = async () => {
    const container = DOMElements.systemOverviewContainer;
    container.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;
    try {
        const usersRef = ref(db, 'users');
        const adminsRef = ref(db, 'admins');
        const materialsRef = ref(db, 'educationalMaterials');
        const [usersSnapshot, adminsSnapshot, materialsSnapshot] = await Promise.all([
            get(usersRef),
            get(adminsRef),
            get(materialsRef)
        ]);
        const totalUsers = usersSnapshot.exists() ? usersSnapshot.size : 0;
        const totalAdmins = adminsSnapshot.exists() ? adminsSnapshot.size : 0;
        const totalNonAdmins = totalUsers - totalAdmins;
        const totalFiles = materialsSnapshot.exists() ? materialsSnapshot.size : 0;
        container.innerHTML = `
            <div class="stat-card-grid">
                <div class="stat-card">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962A3 3 0 0115 9.75V9A6 6 0 003 9v.75a3 3 0 015.25 2.037m-5.25 0A3 3 0 003 16.5v.75a6 6 0 006 6v-1.5a3 3 0 005.25-2.037m-5.25 0h9.75a.75.75 0 010 1.5H5.25a.75.75 0 010-1.5z" /></svg>
                    <h3>${totalUsers}</h3>
                    <p>Total Users</p>
                </div>
                <div class="stat-card">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
                    <h3>${totalAdmins}</h3>
                    <p>Total Admins</p>
                </div>
                <div class="stat-card">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                    <h3>${totalNonAdmins}</h3>
                    <p>Total Non-Admins</p>
                </div>
                <div class="stat-card">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                    <h3>${totalFiles}</h3>
                    <p>Total Public Files</p>
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = `<p>Error loading system stats.</p>`;
        showToast('Could not load system overview.', 'error');
    }
};
// MODIFIED: renderAllMaterials to include an edit button for admins
const renderAllMaterials = () => {
    const searchTerm = DOMElements.searchInput.value.toLowerCase();
    const container = DOMElements.materialsTableContainer;
    container.innerHTML = '';
    const filteredMaterials = AppState.allMaterials.filter(material => {
        if (!material?.description) return false;
        if (!searchTerm) return true;
        return material.description.toLowerCase().includes(searchTerm);
    });
    if (filteredMaterials.length === 0) {
        const message = searchTerm ? 'No materials found matching your search.' : 'No files have been added yet.';
        container.innerHTML = `<p style="text-align: center; padding: 40px; color: var(--text-muted);">${message}</p>`;
        return;
    }
    filteredMaterials.sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0));

    const tableRows = filteredMaterials.map(mat => {
        const date = mat.createdAt ? new Date(mat.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric'}) : 'N/A';
        let adminCells = '';

        if (AppState.isAdmin) {
            const ownerId = mat.isPublic ? mat.addedBy : mat.ownerId;
            const shareAction = `
                <label class="share-toggle-label" title="${mat.isPublic ? 'Make Private' : 'Share Publicly'}">
                    <input type="checkbox" class="share-toggle" 
                        data-id="${mat.id}" 
                        data-owner-id="${ownerId}" 
                        data-is-public="${mat.isPublic}"
                        data-description="${mat.description}"
                        ${mat.isPublic ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            `;
            const actions = `
                <div style="display: flex; gap: 5px; justify-content: center;">
                    <button class="edit-link-btn" data-id="${mat.id}" data-owner-id="${ownerId}" data-is-public="${mat.isPublic}" data-description="${mat.description}" title="Edit Description">
                        <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                    </button>
                    <button class="delete-link-btn" data-id="${mat.id}" data-owner-id="${ownerId}" data-is-public="${mat.isPublic}" data-description="${mat.description}" title="Delete Material">
                        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                    </button>
                </div>
            `;
            adminCells = `<td style="text-align: center;">${shareAction}</td><td style="text-align: center;">${actions}</td>`;
        }

        return `
            <tr>
                <td class="material-description">${mat.description}</td>
                <td>${mat.owner || (mat.addedByEmail ? mat.addedByEmail.split('@')[0] : 'N/A')}</td>
                <td style="text-align: center;">${mat.downloadCount || 0}</td>
                <td>${date}</td>
                <td style="text-align: right;">
                    <button class="download-btn" data-id="${mat.id}" data-owner-id="${mat.isPublic ? mat.addedBy : mat.ownerId}" data-is-public="${mat.isPublic}" data-description="${mat.description}" data-link="${mat.link}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                        <span>Download</span>
                    </button>
                </td>
                ${adminCells}
            </tr>`;
    }).join('');

    const adminHeaders = AppState.isAdmin ? '<th style="text-align: center;">Share</th><th style="text-align: center;">Actions</th>' : '';
    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Owner</th>
                    <th style="text-align: center;">Downloads</th>
                    <th>Date Added</th>
                    <th style="text-align: right;">Link</th>
                    ${adminHeaders}
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `;
    container.innerHTML = tableHTML;
};
const deleteItem = async (id, ownerId, isPublic, description) => {
    const path = isPublic === 'true' ? `educationalMaterials/${id}` : `userMaterials/${ownerId}/${id}`;
    const itemRef = ref(db, path);
    try {
        await remove(itemRef);
        logAction('File Deleted', `Deleted: ${description}`);
        showToast('Material deleted successfully.', 'success');
    } catch (e) {
        showToast('Error deleting material: ' + e.message, 'error');
    } finally {
        DOMElements.confirmationModal.style.display = 'none';
        AppState.actionHandler = null;
        if (AppState.isAdmin) fetchAllMaterials();
    }
};
const toggleAdminRole = async (uid, email, promote) => {
    const adminRef = ref(db, `admins/${uid}`);
    try {
        if (promote) {
            await set(adminRef, { email: email });
            logAction('Admin Promoted', `Promoted: ${email}`);
            showToast(`${email} is now an admin.`, 'success');
        } else {
            await remove(adminRef);
            logAction('Admin Revoked', `Revoked admin for: ${email}`);
            showToast(`Admin privileges revoked for ${email}.`, 'success');
        }
        renderUserList(DOMElements.userSearchInput.value);
    } catch(e) {
        showToast('Error changing role: ' + e.message, 'error');
    } finally {
        DOMElements.confirmationModal.style.display = 'none';
        AppState.actionHandler = null;
    }
};
const populateContentManager = async () => {
    const select = DOMElements.pageContentSelect;
    select.innerHTML = '';
    const links = DOMElements.headerNav.querySelectorAll('a[data-page-id]');
    links.forEach(link => {
        if(link.dataset.pageId !== 'facebook_page') {
            const option = document.createElement('option');
            option.value = link.dataset.pageId;
            option.textContent = link.textContent;
            select.appendChild(option);
        }
    });

    try {
        const response = await fetch('https://api.github.com/repos/gu3sswh4t/COGONNATIONALHIGHSCHOOL/contents/images');
        if (!response.ok) throw new Error('Could not fetch images from GitHub.');
        const files = await response.json();
        AppState.repoImages = files.filter(file => file.type === 'file').map(file => file.name);
    } catch (error) {
        console.error("Error fetching repo images:", error);
        showToast('Could not load images from repository.', 'error');
    }

    select.dispatchEvent(new Event('change'));
};
const showContentPage = async (pageId, pageTitle) => {
    if (pageId === 'facebook_page') {
        window.open('https://www.facebook.com/CogonNHSOfficial', '_blank');
        return;
    }

    DOMElements.contentModalTitle.textContent = pageTitle;
    DOMElements.contentModalBody.innerHTML = `<div class="spinner"></div>`;

    const contentRef = ref(db, `pageContent/${pageId}`);
    const snapshot = await get(contentRef);

    if (snapshot.exists()) {
        const content = snapshot.val();
        if (content.imageUrls && content.imageUrls.length > 0) {
            openImageGallery(content.imageUrls, 0);
        } else if (content.text) {
            DOMElements.contentModalBody.innerHTML = `<div style="white-space: pre-wrap;">${content.text}</div>`;
            DOMElements.contentModal.style.display = 'flex';
        } else if (content.links) {
            let linksHTML = '<div class="resource-links-container">';
            for(const key in content.links) {
                linksHTML += `
                    <a href="${content.links[key].url}" target="_blank" class="resource-link-card">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                        <span>${content.links[key].name}</span>
                    </a>`;
            }
            linksHTML += '</div>';
            DOMElements.contentModalBody.innerHTML = linksHTML;
            DOMElements.contentModal.style.display = 'flex';
        } else {
            DOMElements.contentModalBody.innerHTML = `<p>Content coming soon.</p>`;
            DOMElements.contentModal.style.display = 'flex';
        }
    } else {
        DOMElements.contentModalBody.innerHTML = `<p>Content coming soon.</p>`;
        DOMElements.contentModal.style.display = 'flex';
    }
};
const openImageGallery = (images, index) => {
    DOMElements.contentModal.style.display = 'none';
    AppState.galleryImages = images;
    AppState.currentGalleryIndex = index;
    DOMElements.galleryModal.style.display = 'flex';
    updateGalleryImage();
};
const updateGalleryImage = () => {
    DOMElements.galleryImage.src = AppState.galleryImages[AppState.currentGalleryIndex];
    DOMElements.galleryImage.classList.remove('zoomed');
};
const changeGalleryImage = (direction) => {
    AppState.currentGalleryIndex += direction;
    if (AppState.currentGalleryIndex >= AppState.galleryImages.length) {
        AppState.currentGalleryIndex = 0;
    }
    if (AppState.currentGalleryIndex < 0) {
        AppState.currentGalleryIndex = AppState.galleryImages.length - 1;
    }
    updateGalleryImage();
};
const populateMobileNav = () => {
    const container = DOMElements.mobileNavLinks;
    container.innerHTML = '';

    const navContent = DOMElements.headerNav.cloneNode(true);
    navContent.style.display = 'block';
    container.appendChild(navContent);

    const controlsContainer = document.createElement('div');
    controlsContainer.style.marginTop = '30px';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column';
    controlsContainer.style.gap = '15px';

    if (auth.currentUser) {
        if (!AppState.isSystemAdmin) {
            const myClassesBtn = DOMElements.myClassesBtn.cloneNode(true);
            myClassesBtn.style.display = 'block';
            myClassesBtn.addEventListener('click', () => {
                DOMElements.mobileNavOverlay.classList.remove('open');
                DOMElements.myClassesBtn.click();
            });
            controlsContainer.appendChild(myClassesBtn);
        }

        const accountBtn = DOMElements.changePasswordBtn.cloneNode(true);
        accountBtn.style.display = 'block';
        accountBtn.addEventListener('click', () => {
            DOMElements.mobileNavOverlay.classList.remove('open');
            DOMElements.changePasswordBtn.click();
        });
        controlsContainer.appendChild(accountBtn);

        if(AppState.isSystemAdmin){
            const overviewBtn = DOMElements.systemOverviewBtn.cloneNode(true);
            overviewBtn.style.display = 'block';
            overviewBtn.addEventListener('click', () => {
                DOMElements.mobileNavOverlay.classList.remove('open');
                DOMElements.systemOverviewBtn.click();
            });
            controlsContainer.appendChild(overviewBtn);
        }

        const logoutBtn = DOMElements.logoutBtn.cloneNode(true);
        logoutBtn.style.display = 'block';
        logoutBtn.addEventListener('click', () => {
            DOMElements.mobileNavOverlay.classList.remove('open');
            DOMElements.logoutBtn.click();
        });
        controlsContainer.appendChild(logoutBtn);
    }
    container.appendChild(controlsContainer);
};
const startAchievementBanner = () => {
    const achievementsRef = ref(db, 'achievements');
    onValue(achievementsRef, (snapshot) => {
        if (snapshot.exists()) {
            AppState.achievements = Object.values(snapshot.val());
            if (AppState.achievements.length > 0) {
                DOMElements.achievementBanner.style.display = 'flex';
                setInterval(() => {
                    const achievementText = DOMElements.achievementText;
                    achievementText.classList.remove('visible');
                    setTimeout(() => {
                        AppState.currentAchievementIndex = (AppState.currentAchievementIndex + 1) % AppState.achievements.length;
                        achievementText.textContent = AppState.achievements[AppState.currentAchievementIndex].text;
                        achievementText.classList.add('visible');
                    }, 500);
                }, 5000);
            } else {
                DOMElements.achievementBanner.style.display = 'none';
            }
        } else {
            DOMElements.achievementBanner.style.display = 'none';
        }
    });
};
const renderAchievementsList = () => {
    const container = DOMElements.achievementsList;
    const achievementsRef = ref(db, 'achievements');
    onValue(achievementsRef, (snapshot) => {
        container.innerHTML = '';
        if (snapshot.exists()) {
            snapshot.forEach(child => {
                const achievement = child.val();
                const div = document.createElement('div');
                div.innerHTML = `<span>${achievement.text}</span> <button data-id="${child.key}" class="remove-link-btn">Remove</button>`;
                container.appendChild(div);
            });
        }
    });
};
const generateAccessKey = async () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(2000 + Math.random() * 8000);
    return `${year}-${randomNum}`;
};
const renderMyClasses = (userId) => {
    const classesRef = ref(db, 'classes');
    onValue(classesRef, (snapshot) => {
        const container = DOMElements.myClassesContainer;
        container.innerHTML = '';
        if (snapshot.exists()) {
            let hasClasses = false;
            snapshot.forEach(child => {
                const classData = child.val();
                if (classData.ownerId === userId) {
                    hasClasses = true;
                    const classCard = document.createElement('div');
                    classCard.className = 'class-card';
                    classCard.innerHTML = `
                        <div class="class-info">
                            <h4>${classData.className}</h4>
                            <p>Access Key: <span class="class-key">${classData.accessKey}</span></p>
                        </div>
                        <div class="class-actions">
                            <button class="form-button manage-files-btn" data-key="${child.key}" data-name="${classData.className}">Manage Files</button>
                            <button class="form-button revoke" data-key="${child.key}" data-name="${classData.className}">Delete</button>
                        </div>
                    `;
                    container.appendChild(classCard);
                }
            });
            if (!hasClasses) {
                container.innerHTML = `<p style="text-align: center; padding: 40px; color: var(--text-muted);">You haven't created any classes yet.</p>`;
            }
        } else {
            container.innerHTML = `<p style="text-align: center; padding: 40px; color: var(--text-muted);">You haven't created any classes yet.</p>`;
        }
    });
};
const renderClassFilesForStudent = (classData, classKey) => {
    const container = DOMElements.studentClassFilesContainer;
    container.innerHTML = '';
    const materials = classData.materials || {};
    const materialKeys = Object.keys(materials);

    if (materialKeys.length === 0) {
        container.innerHTML = `<p style="text-align: center; padding: 40px; color: var(--text-muted);">This class has no files yet.</p>`;
        return;
    }

    let tableRows = '';
    materialKeys.sort((a,b) => (materials[b].createdAt || 0) - (materials[a].createdAt || 0)).forEach(key => {
        const mat = materials[key];
        const date = mat.createdAt ? new Date(mat.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric'}) : 'N/A';
        tableRows += `
            <tr>
                <td class="material-description">${mat.description}</td>
                <td>${date}</td>
                <td style="text-align: right;">
                    <button class="download-btn" data-link="${mat.link}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                        <span>Download</span>
                    </button>
                </td>
            </tr>
        `;
    });

    const tableHTML = `
        <h3>Files for ${classData.className}</h3>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Date Added</th>
                    <th style="text-align: right;">Link</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `;
    container.innerHTML = tableHTML;
};
const renderClassFileManager = (classKey, className) => {
    DOMElements.classFilesModalTitle.textContent = `Manage Files for ${className}`;
    const body = DOMElements.classFilesModalBody;
    body.innerHTML = `
        <div class="admin-form-section">
            <h3>Add New File to Class</h3>
            <form id="addClassFileForm">
                <input type="text" id="classGoogleDriveLink" placeholder="Paste Google Drive Share Link" required />
                <div class="file-link-group">
                    <input type="text" id="classFileLink" placeholder="Generated Download Link" required readonly />
                    <button type="button" id="generateClassFileLinkBtn" class="generate-link-btn">Generate</button>
                </div>
                <input type="text" id="classFileDescription" placeholder="File Description" required />
                <button type="submit" class="form-button">Add File to Class</button>
            </form>
        </div>
        <div id="classFilesTableContainer" style="margin-top: 20px;"></div>
    `;
    DOMElements.classFilesModal.style.display = 'flex';

    const classFilesRef = ref(db, `classes/${classKey}/materials`);
    onValue(classFilesRef, (snapshot) => {
        const container = document.getElementById('classFilesTableContainer');
        container.innerHTML = '';
        const materials = snapshot.val() || {};
        const keys = Object.keys(materials);
        if (keys.length === 0) {
            container.innerHTML = '<p>No files in this class yet.</p>';
            return;
        }
        let tableRows = keys.map(key => {
            const mat = materials[key];
            return `
                <tr>
                    <td>${mat.description}</td>
                    <td>
                        <button class="delete-link-btn delete-class-file-btn" data-class-key="${classKey}" data-file-key="${key}" title="Delete File">
                            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
        container.innerHTML = `
            <table class="data-table">
                <thead><tr><th>Description</th><th>Action</th></tr></thead>
                <tbody>${tableRows}</tbody>
            </table>
        `;
    });
};
const initializeLandingGallery = async () => {
    try {
        const response = await fetch('https://api.github.com/repos/gu3sswh4t/COGONNATIONALHIGHSCHOOL/contents/LandingPagePics');
        if (!response.ok) throw new Error('Network response was not ok');
        const files = await response.json();
        const imageFiles = files.filter(file => file.type === 'file' && /\.(jpe?g|png|gif)$/i.test(file.name));
        const imageUrls = imageFiles.map(file => file.download_url);

        if (imageUrls.length === 0) return;

        const track = DOMElements.galleryTrack;
        track.innerHTML = '';

        imageUrls.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            track.appendChild(img);
        });

        imageUrls.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            track.appendChild(img);
        });

        const animationDuration = imageUrls.length * 5;
        track.style.animationDuration = `${animationDuration}s`;

    } catch (error) {
        console.error("Failed to fetch landing page images:", error);
    }
};

// --- Event Listeners ---
document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    initializeLandingGallery();
    DOMElements.togglePassword.innerHTML = eyeIconSVG; // Set initial password toggle icon
    onAuthStateChanged(auth, user => {
        updateUI().then(() => {
            if (user) {
                if (!AppState.isSystemAdmin) {
                    renderMyClasses(user.uid);
                }
            }
            if (AppState.isSystemAdmin) {
                populateContentManager();
            }
            populateMobileNav();
        });
    });
    startAchievementBanner();
    DOMElements.currentYear.textContent = new Date().getFullYear();
});

// --- NEW FEATURE: Password Toggle ---
DOMElements.togglePassword.addEventListener('click', () => {
    const passwordInput = DOMElements.loginPassword;
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    DOMElements.togglePassword.innerHTML = isPassword ? eyeSlashIconSVG : eyeIconSVG;
    DOMElements.togglePassword.title = isPassword ? 'Hide password' : 'Show password';
});

// --- NEW FEATURE: Forgot Password ---
DOMElements.forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    DOMElements.forgotPasswordModal.style.display = 'flex';
});

DOMElements.forgotPasswordModalCloseBtn.addEventListener('click', () => {
    DOMElements.forgotPasswordModal.style.display = 'none';
    // Reset modal to initial state after closing
    setTimeout(() => {
        DOMElements.forgotPasswordContent.style.display = 'block';
        DOMElements.resetSuccessMessage.style.display = 'none';
        DOMElements.forgotPasswordForm.reset();
    }, 300);
});

DOMElements.forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = DOMElements.forgotPasswordEmail.value;
    sendPasswordResetEmail(auth, email)
        .then(() => {
            DOMElements.forgotPasswordContent.style.display = 'none';
            DOMElements.resetSuccessMessage.style.display = 'block';
        })
        .catch((error) => {
            let message = 'Failed to send reset email. Please try again.';
            if (error.code === 'auth/user-not-found') {
                message = 'No account found with that email address.';
            }
            showToast(message, 'error');
        });
});

// --- NEW FEATURE: Edit File Name ---
const openEditModal = (id, ownerId, isPublic, currentDescription) => {
    AppState.editingFile = { id, ownerId, isPublic: isPublic === 'true' };
    DOMElements.editDescriptionInput.value = currentDescription;
    DOMElements.editModal.style.display = 'flex';
};

DOMElements.editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!AppState.editingFile) return;

    const { id, ownerId, isPublic } = AppState.editingFile;
    const newDescription = DOMElements.editDescriptionInput.value.trim();

    if (!newDescription) {
        showToast('Description cannot be empty.', 'error');
        return;
    }

    const path = isPublic ? `educationalMaterials/${id}` : `userMaterials/${ownerId}/${id}`;
    const itemRef = ref(db, path);

    try {
        await update(itemRef, { description: newDescription });
        logAction('File Edited', `Renamed file to: ${newDescription}`);
        showToast('File description updated successfully!', 'success');
        DOMElements.editModal.style.display = 'none';
        AppState.editingFile = null;
        // Refresh views
        if(AppState.isAdmin) {
            fetchAllMaterials();
        } else {
            fetchPrivateMaterials(auth.currentUser.uid);
        }
    } catch (error) {
        showToast('Error updating file: ' + error.message, 'error');
    }
});

DOMElements.editModalCloseBtn.addEventListener('click', () => { DOMElements.editModal.style.display = 'none'; });
DOMElements.cancelEditBtn.addEventListener('click', () => { DOMElements.editModal.style.display = 'none'; });

// --- Modified Event Listeners to handle Edit ---
DOMElements.materialsTableContainer.addEventListener('click', async (e) => {
    const editButton = e.target.closest('button.edit-link-btn');
    if (editButton) {
        const { id, ownerId, isPublic, description } = editButton.dataset;
        openEditModal(id, ownerId, isPublic, description);
        return; // Stop further execution
    }

    // ... (rest of the existing listener code for delete, download, share) ...
    const deleteButton = e.target.closest('button.delete-link-btn');
    const downloadButton = e.target.closest('button.download-btn');
    const shareToggle = e.target.closest('input.share-toggle');

    if (deleteButton) {
        const id = deleteButton.dataset.id;
        const ownerId = deleteButton.dataset.ownerId;
        const isPublic = deleteButton.dataset.isPublic;
        const description = deleteButton.dataset.description;
        DOMElements.confirmationTitle.textContent = 'Confirm Deletion';
        DOMElements.confirmationMessage.textContent = `Are you sure you want to delete "${description}"?`;
        DOMElements.confirmationModal.style.display = 'flex';
        AppState.actionHandler = () => deleteItem(id, ownerId, isPublic, description);
    }
    if (downloadButton) {
        const id = downloadButton.dataset.id;
        const ownerId = downloadButton.dataset.ownerId;
        const isPublic = downloadButton.dataset.isPublic === 'true';
        const link = downloadButton.dataset.link;
        const description = downloadButton.dataset.description;
        const path = isPublic ? `educationalMaterials/${id}/downloadCount` : `userMaterials/${ownerId}/${id}/downloadCount`;
        const countRef = ref(db, path);
        runTransaction(countRef, (currentCount) => (currentCount || 0) + 1)
        .then(() => {
            logAction('File Downloaded', `Downloaded: ${description}`);
            window.open(link, '_blank');
        }).catch((error) => {
            window.open(link, '_blank');
        });
    }
    if (shareToggle) {
        const id = shareToggle.dataset.id;
        const ownerId = shareToggle.dataset.ownerId;
        const description = shareToggle.dataset.description;
        const isNowPublic = shareToggle.checked;

        if (isNowPublic) {
            const privateRef = ref(db, `userMaterials/${ownerId}/${id}`);
            const privateSnap = await get(privateRef);
            if (privateSnap.exists()) {
                const materialData = privateSnap.val();
                const publicRef = ref(db, `educationalMaterials/${id}`);
                await set(publicRef, {
                    ...materialData,
                    isPublic: true,
                    addedBy: ownerId,
                    addedByEmail: AppState.allUsers[ownerId]?.email || 'N/A',
                    downloadCount: materialData.downloadCount || 0
                });
                await remove(privateRef);
                showToast(`"${description}" is now public.`, 'success');
                logAction('File Shared Publicly', `Shared: ${description}`);
            }
        } else {
            const publicRef = ref(db, `educationalMaterials/${id}`);
            const publicSnap = await get(publicRef);
            if (publicSnap.exists()) {
                const materialData = publicSnap.val();
                const privateRef = ref(db, `userMaterials/${ownerId}/${id}`);
                await set(privateRef, {
                    link: materialData.link,
                    description: materialData.description,
                    createdAt: materialData.createdAt,
                    downloadCount: materialData.downloadCount || 0,
                    isPublic: false
                });
                await remove(publicRef);
                showToast(`"${description}" is now private.`, 'info');
                logAction('File Made Private', `Made private: ${description}`);
            }
        }
        fetchAllMaterials();
    }
});

DOMElements.privateMaterialsTableContainer.addEventListener('click', (e) => {
    const editButton = e.target.closest('button.edit-link-btn');
    if (editButton) {
        const { id, isPublic, description } = editButton.dataset;
        const user = auth.currentUser;
        if (!user) return;
        openEditModal(id, user.uid, isPublic, description);
        return;
    }

    // ... (rest of the existing listener code for delete, download) ...
    const deleteButton = e.target.closest('button.delete-link-btn');
    const downloadButton = e.target.closest('button.download-btn');
    if (deleteButton) {
        const id = deleteButton.dataset.id;
        const description = deleteButton.dataset.description;
        const user = auth.currentUser;
        if(!user) return;
        DOMElements.confirmationTitle.textContent = 'Confirm Deletion';
        DOMElements.confirmationMessage.textContent = `Are you sure you want to delete "${description}"?`;
        DOMElements.confirmationModal.style.display = 'flex';
        AppState.actionHandler = () => deleteItem(id, user.uid, 'false', description);
    }
    if (downloadButton) {
        const link = downloadButton.dataset.link;
        window.open(link, '_blank');
    }
});

// --- Original Event Listeners (Unchanged ones omitted for brevity) ---
// (All other listeners from your original script are still here, just not repeated)
DOMElements.themeToggle.addEventListener('change', () => {
    applyTheme(DOMElements.themeToggle.checked ? 'dark' : 'light');
});
DOMElements.mainLogo.addEventListener('click', () => {
    if (auth.currentUser) {
        const allSections = [DOMElements.adminPanel, DOMElements.systemAdminPanel, DOMElements.updatePasswordSection, DOMElements.systemOverviewSection, DOMElements.authSection, DOMElements.classManagementSection, DOMElements.studentAccessSection, DOMElements.privateLinksSection];
        allSections.forEach(el => el.style.display = 'none');

        if (AppState.isSystemAdmin) {
            DOMElements.systemAdminPanel.style.display = 'block';
        } else {
            DOMElements.learningResourcesSection.style.display = 'block';
            if (AppState.isAdmin) {
                DOMElements.adminPanel.style.display = 'block';
            } else {
                DOMElements.privateLinksSection.style.display = 'block';
            }
        }
    } else {
        location.reload();
    }
});
DOMElements.loginBtn.addEventListener('click', () => {
    DOMElements.landingPage.style.display = 'none';
    DOMElements.authSection.style.display = 'block';
    document.body.className = 'logged-in-theme';
});
DOMElements.studentAccessBtn.addEventListener('click', () => {
    DOMElements.landingPage.style.display = 'none';
    DOMElements.studentAccessSection.style.display = 'block';
    document.body.className = 'logged-in-theme';
});
DOMElements.backToLandingBtn.addEventListener('click', () => {
    DOMElements.authSection.style.display = 'none';
    DOMElements.studentAccessSection.style.display = 'none';
    DOMElements.landingPage.style.display = 'flex';
    document.body.className = 'logged-out-theme';
});
DOMElements.backFromStudentAccessBtn.addEventListener('click', () => {
    DOMElements.authSection.style.display = 'none';
    DOMElements.studentAccessSection.style.display = 'none';
    DOMElements.landingPage.style.display = 'flex';
    document.body.className = 'logged-out-theme';
});
DOMElements.logoutBtn.addEventListener('click', () => {
    signOut(auth).catch(error => showToast('Logout failed: ' + error.message, 'error'));
    showToast('You have been logged out.', 'info');
});
DOMElements.changePasswordBtn.addEventListener('click', () => {
    const allSections = [DOMElements.adminPanel, DOMElements.systemAdminPanel, DOMElements.learningResourcesSection, DOMElements.systemOverviewSection, DOMElements.classManagementSection, DOMElements.privateLinksSection];
    allSections.forEach(sec => sec.style.display = 'none');
    DOMElements.updatePasswordSection.style.display = 'block';
});
DOMElements.systemOverviewBtn.addEventListener('click', () => {
    const allSections = [DOMElements.adminPanel, DOMElements.systemAdminPanel, DOMElements.learningResourcesSection, DOMElements.updatePasswordSection, DOMElements.classManagementSection];
    allSections.forEach(sec => sec.style.display = 'none');
    DOMElements.systemOverviewSection.style.display = 'block';
    renderSystemOverview();
});
DOMElements.userSearchInput.addEventListener('input', (e) => {
    renderUserList(e.target.value);
});
DOMElements.pageContentSelect.addEventListener('change', async (e) => {
    const pageId = e.target.value;
    const container = DOMElements.contentEditorArea;
    container.innerHTML = '';

    const contentRef = ref(db, `pageContent/${pageId}`);
    const snapshot = await get(contentRef);
    const savedContent = snapshot.exists() ? snapshot.val() : {};

    if (pageId === 'history') {
        container.innerHTML = `<textarea id="history-editor" placeholder="Enter the school's history here...">${savedContent.text || ''}</textarea>`;
    } else if (pageId === 'learning_links') {
        let linksHTML = '<div id="resource-links-container">';
        if (savedContent.links) {
            for (const key in savedContent.links) {
                const link = savedContent.links[key];
                linksHTML += `<div class="link-admin-item"><input type="text" value="${link.name}" readonly><input type="text" value="${link.url}" readonly><button data-key="${key}" class="remove-link-btn">&times;</button></div>`;
            }
        }
        linksHTML += '</div><div class="link-admin-item"><input type="text" id="new-link-name" placeholder="Link Name"><input type="text" id="new-link-url" placeholder="Link URL"><button type="button" id="add-resource-link-btn" class="form-button">+</button></div>';
        container.innerHTML = linksHTML;
    } else {
        if (AppState.repoImages.length === 0) {
            container.innerHTML = '<p>No images found in the GitHub "images" folder.</p>';
            return;
        }
        let imageSelectionHTML = '<div id="image-selection-container">';
        const savedImages = savedContent.imageUrls || [];
        AppState.repoImages.forEach(imageName => {
            const imageUrl = `https://raw.githubusercontent.com/gu3sswh4t/COGONNATIONALHIGHSCHOOL/main/images/${imageName}`;
            const isChecked = savedImages.includes(imageUrl);
            imageSelectionHTML += `
                <label>
                    <input type="checkbox" name="contentImage" value="${imageUrl}" ${isChecked ? 'checked' : ''}>
                    ${imageName}
                </label>
            `;
        });
        imageSelectionHTML += '</div>';
        container.innerHTML = imageSelectionHTML;
    }
});
DOMElements.contentManagementForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pageId = DOMElements.pageContentSelect.value;
    const selectedOption = DOMElements.pageContentSelect.options[DOMElements.pageContentSelect.selectedIndex];
    const title = selectedOption.textContent;
    const contentRef = ref(db, `pageContent/${pageId}`);
    let contentToSave = { title };

    if (pageId === 'learning_links') {
        const links = {};
        document.querySelectorAll('#resource-links-container .link-admin-item').forEach(item => {
            const nameInput = item.querySelector('input:nth-of-type(1)');
            const urlInput = item.querySelector('input:nth-of-type(2)');
            if (nameInput && urlInput && nameInput.value && urlInput.value) {
                const key = item.dataset.key || push(ref(db, `pageContent/${pageId}/links`)).key;
                links[key] = { name: nameInput.value, url: urlInput.value };
            }
        });
        const newNameInput = document.getElementById('new-link-name');
        const newUrlInput = document.getElementById('new-link-url');
        if (newNameInput.value && newUrlInput.value) {
            const newKey = push(ref(db, `pageContent/${pageId}/links`)).key;
            links[newKey] = { name: newNameInput.value, url: newUrlInput.value };
        }
        contentToSave.links = links;
    } else if (pageId === 'history') {
        contentToSave.text = document.getElementById('history-editor').value;
    } else {
        const selectedCheckboxes = DOMElements.contentManagementForm.querySelectorAll('input[name="contentImage"]:checked');
        contentToSave.imageUrls = Array.from(selectedCheckboxes).map(cb => cb.value);
    }

    if (Object.keys(contentToSave).length > 1) {
        try {
            await set(contentRef, contentToSave);
            showToast('Content saved successfully!', 'success');
            logAction('Content Updated', `Updated page: ${title}`);
        } catch (error) {
            showToast('Error saving content: ' + error.message, 'error');
        }
    } else {
        showToast('No new content to save.', 'info');
    }
});
DOMElements.achievementForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = DOMElements.newAchievementText.value.trim();
    if (text) {
        const achievementsRef = ref(db, 'achievements');
        const newAchievementRef = push(achievementsRef);
        set(newAchievementRef, { text })
            .then(() => {
                showToast('Achievement added!', 'success');
                DOMElements.newAchievementText.value = '';
            })
            .catch(err => showToast('Error: ' + err.message, 'error'));
    }
});
DOMElements.achievementsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-link-btn')) {
        const id = e.target.dataset.id;
        const achievementRef = ref(db, `achievements/${id}`);
        remove(achievementRef).then(() => showToast('Achievement removed.', 'success'));
    }
});
DOMElements.contentEditorArea.addEventListener('click', (e) => {
    if (e.target.id === 'add-resource-link-btn') {
        const nameInput = document.getElementById('new-link-name');
        const urlInput = document.getElementById('new-link-url');
        if (nameInput.value && urlInput.value) {
            const container = document.getElementById('resource-links-container');
            const newLinkDiv = document.createElement('div');
            newLinkDiv.classList.add('link-admin-item');
            newLinkDiv.innerHTML = `<input type="text" value="${nameInput.value}" readonly><input type="text" value="${urlInput.value}" readonly><button class="remove-link-btn">&times;</button>`;
            container.appendChild(newLinkDiv);
            nameInput.value = '';
            urlInput.value = '';
        }
    }
    if (e.target.classList.contains('remove-link-btn')) {
        e.target.parentElement.remove();
    }
});
DOMElements.headerNav.addEventListener('click', (e) => {
    if (e.target.matches('a[data-page-id]')) {
        e.preventDefault();
        const pageId = e.target.dataset.pageId;
        const pageTitle = e.target.textContent;
        showContentPage(pageId, pageTitle);
    }
});
DOMElements.mobileNavLinks.addEventListener('click', (e) => {
    if (e.target.matches('a[data-page-id]')) {
        e.preventDefault();
        DOMElements.mobileNavOverlay.classList.remove('open');
        const pageId = e.target.dataset.pageId;
        const pageTitle = e.target.textContent;
        showContentPage(pageId, pageTitle);
    }
     if (e.target.id === 'classFilesLink' || e.target.parentElement.id === 'classFilesLink') {
        e.preventDefault();
        DOMElements.mobileNavOverlay.classList.remove('open');
        DOMElements.myClassesBtn.click();
    }
});
DOMElements.mobileMenuBtn.addEventListener('click', () => {
    DOMElements.mobileNavOverlay.classList.add('open');
});
DOMElements.mobileNavCloseBtn.addEventListener('click', () => {
    DOMElements.mobileNavOverlay.classList.remove('open');
});
DOMElements.contentModalCloseBtn.addEventListener('click', () => {
    DOMElements.contentModal.style.display = 'none';
});
DOMElements.galleryModalCloseBtn.addEventListener('click', () => {
    DOMElements.galleryModal.style.display = 'none';
});
DOMElements.galleryPrevBtn.addEventListener('click', () => {
    changeGalleryImage(-1);
});
DOMElements.galleryNextBtn.addEventListener('click', () => {
    changeGalleryImage(1);
});
DOMElements.galleryImage.addEventListener('click', () => {
    DOMElements.galleryImage.classList.toggle('zoomed');
});
DOMElements.loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(auth, DOMElements.loginEmail.value, DOMElements.loginPassword.value);
    } catch (error) {
        showToast('Login failed. Please check your credentials.', 'error');
    }
});
DOMElements.createUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = DOMElements.newUserEmail.value;
    const password = DOMElements.newUserPassword.value;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        const userRef = ref(db, `users/${uid}`);
        await set(userRef, { email: email });
        logAction('User Created', `Created account for: ${email}`);
        showToast(`User ${email} created successfully.`, 'success');
        DOMElements.createUserForm.reset();
        if (AppState.isSystemAdmin) {
            fetchAllUsers();
        }
    } catch(error) {
        showToast(`Error creating user: ${error.code}`, 'error');
    }
});
DOMElements.updatePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPassword = DOMElements.newPasswordInput.value;
    const confirmPassword = DOMElements.confirmNewPasswordInput.value;
    if (newPassword.length < 6) {
        showToast('Password must be at least 6 characters.', 'error'); return;
    }
    if (newPassword !== confirmPassword) {
        showToast('Passwords do not match.', 'error'); return;
    }
    const user = auth.currentUser;
    if (user) {
        try {
            await updatePassword(user, newPassword);
            logAction('Password Changed', 'User changed their own password.');
            showToast('Password updated successfully!', 'success');
            DOMElements.updatePasswordForm.reset();
            DOMElements.mainLogo.click();
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                showToast('For security, please log out and log back in to change password.', 'error');
            } else {
                showToast(`Error: ${error.code}`, 'error');
            }
        }
    }
});
DOMElements.cancelUpdatePasswordBtn.addEventListener('click', () => {
    DOMElements.mainLogo.click();
});
DOMElements.generateLinkBtn.addEventListener('click', () => {
    const shareLink = DOMElements.googleDriveShareLink.value.trim();
    if (!shareLink) {
        showToast('Please paste a Google Drive share link first.', 'error'); return;
    }
    const match = shareLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        const fileId = match[1];
        const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
        DOMElements.fileLinkInput.value = downloadLink;
        showToast('Download link generated!', 'success');
    } else {
        showToast('Invalid Google Drive share link format. Must contain "/d/FILE_ID/".', 'error');
    }
});
DOMElements.addLinkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const link = DOMElements.fileLinkInput.value.trim();
    const description = DOMElements.linkDescriptionInput.value.trim();
    if (!link || !description) {
        showToast('Link and Description are required!', 'error'); return;
    }
    const newMaterialRef = push(ref(db, 'educationalMaterials'));
    try {
        await set(newMaterialRef, {
            link,
            description,
            downloadCount: 0,
            addedByEmail: auth.currentUser.email,
            createdAt: serverTimestamp(),
            addedBy: auth.currentUser.uid
        });
        logAction('Public File Uploaded', `Uploaded: ${description}`);
        showToast('Link added successfully!', 'success');
        DOMElements.addLinkForm.reset();
    } catch (error) {
        showToast('Error adding link: ' + error.message, 'error');
    }
});
DOMElements.generatePrivateLinkBtn.addEventListener('click', () => {
    const shareLink = DOMElements.privateGoogleDriveShareLink.value.trim();
    if (!shareLink) {
        showToast('Please paste a Google Drive share link first.', 'error'); return;
    }
    const match = shareLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        const fileId = match[1];
        const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
        DOMElements.privateFileLink.value = downloadLink;
        showToast('Download link generated!', 'success');
    } else {
        showToast('Invalid Google Drive share link format. Must contain "/d/FILE_ID/".', 'error');
    }
});
DOMElements.addPrivateLinkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if(!user) return;

    const link = DOMElements.privateFileLink.value.trim();
    const description = DOMElements.privateLinkDescription.value.trim();
    if (!link || !description) {
        showToast('Link and Description are required!', 'error'); return;
    }
    const newMaterialRef = push(ref(db, `userMaterials/${user.uid}`));
    try {
        await set(newMaterialRef, {
            link,
            description,
            isPublic: false,
            createdAt: serverTimestamp(),
        });
        logAction('Private File Uploaded', `Uploaded: ${description}`);
        showToast('Private link added successfully!', 'success');
        DOMElements.addPrivateLinkForm.reset();
    } catch (error) {
        showToast('Error adding private link: ' + error.message, 'error');
    }
});
DOMElements.searchInput.addEventListener("input", renderAllMaterials);
DOMElements.privateSearchInput.addEventListener('input', () => {
    AppState.privateItemsToShow = 10;
    updateAndRenderPrivateMaterials();
});
DOMElements.privateMaterialsTableContainer.addEventListener('scroll', () => {
    const container = DOMElements.privateMaterialsTableContainer;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
        const searchTerm = DOMElements.privateSearchInput.value.toLowerCase();
        const totalFilteredCount = AppState.privateMaterials.filter(material =>
            material.description.toLowerCase().includes(searchTerm)
        ).length;
        if (AppState.privateItemsToShow < totalFilteredCount) {
            AppState.privateItemsToShow += 10;
            updateAndRenderPrivateMaterials();
        }
    }
});

DOMElements.userManagementContainer.addEventListener('click', (e) => {
    const toggleButton = e.target.closest('.role-toggle-btn');
    if (toggleButton) {
        const uid = toggleButton.dataset.uid;
        const email = toggleButton.dataset.email;
        const promote = toggleButton.classList.contains('promote');
        DOMElements.confirmationTitle.textContent = 'Confirm Role Change';
        DOMElements.confirmationMessage.textContent = `Are you sure you want to ${promote ? 'promote' : 'revoke admin for'} ${email}?`;
        DOMElements.confirmationModal.style.display = 'flex';
        AppState.actionHandler = () => toggleAdminRole(uid, email, promote);
    }
});
DOMElements.myClassesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const allSections = [DOMElements.landingPage, DOMElements.authSection, DOMElements.adminPanel, DOMElements.systemAdminPanel, DOMElements.learningResourcesSection, DOMElements.updatePasswordSection, DOMElements.systemOverviewSection, DOMElements.privateLinksSection];
    allSections.forEach(sec => sec.style.display = 'none');
    DOMElements.classManagementSection.style.display = 'block';
});
DOMElements.adminMyPrivateFilesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const allSections = [DOMElements.landingPage, DOMElements.authSection, DOMElements.adminPanel, DOMElements.systemAdminPanel, DOMElements.learningResourcesSection, DOMElements.updatePasswordSection, DOMElements.systemOverviewSection, DOMElements.classManagementSection];
    allSections.forEach(sec => sec.style.display = 'none');
    DOMElements.learningResourcesSection.style.display = 'block';
    DOMElements.adminPanel.style.display = 'block';
});
DOMElements.backFromClassesBtn.addEventListener('click', () => {
    DOMElements.mainLogo.click();
});
DOMElements.createClassForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    const className = DOMElements.newClassName.value.trim();
    if (!className) {
        showToast('Please enter a class name.', 'error');
        return;
    }

    const accessKey = await generateAccessKey();
    const classRef = ref(db, `classes/${accessKey}`);
    try {
        await set(classRef, {
            className,
            accessKey,
            ownerId: user.uid,
            ownerEmail: user.email,
            createdAt: serverTimestamp()
        });
        showToast(`Class "${className}" created successfully!`, 'success');
        logAction('Class Created', `Created class: ${className}`);
        DOMElements.createClassForm.reset();
    } catch (error) {
        showToast('Error creating class: ' + error.message, 'error');
    }
});
DOMElements.myClassesContainer.addEventListener('click', (e) => {
    const manageBtn = e.target.closest('.manage-files-btn');
    const deleteBtn = e.target.closest('.revoke');

    if (manageBtn) {
        document.querySelectorAll('.manage-files-btn.active-class-manager').forEach(btn => btn.classList.remove('active-class-manager'));
        manageBtn.classList.add('active-class-manager');
        const classKey = manageBtn.dataset.key;
        const className = manageBtn.dataset.name;
        renderClassFileManager(classKey, className);
    }
    if (deleteBtn) {
        const classKey = deleteBtn.dataset.key;
        const className = deleteBtn.dataset.name;
        DOMElements.confirmationTitle.textContent = 'Confirm Deletion';
        DOMElements.confirmationMessage.textContent = `Are you sure you want to delete the class "${className}"? This cannot be undone.`;
        DOMElements.confirmationModal.style.display = 'flex';
        AppState.actionHandler = async () => {
            await remove(ref(db, `classes/${classKey}`));
            showToast(`Class "${className}" deleted.`, 'success');
            logAction('Class Deleted', `Deleted class: ${className}`);
            DOMElements.confirmationModal.style.display = 'none';
            AppState.actionHandler = null;
        };
    }
});
DOMElements.classFilesModal.addEventListener('submit', async (e) => {
    if (e.target.id === 'addClassFileForm') {
        e.preventDefault();
        const activeBtn = document.querySelector('.manage-files-btn.active-class-manager');
        if (!activeBtn) {
            showToast('Error: Could not identify the current class. Please close and reopen the manager.', 'error');
            return;
        }
        const classKey = activeBtn.dataset.key;
        const link = document.getElementById('classFileLink').value.trim();
        const description = document.getElementById('classFileDescription').value.trim();

        if (!link || !description) {
            showToast('Link and description are required.', 'error');
            return;
        }
        const newFileRef = push(ref(db, `classes/${classKey}/materials`));
        try {
            await set(newFileRef, {
                link,
                description,
                createdAt: serverTimestamp()
            });
            showToast('File added to class.', 'success');
            logAction('Class File Added', `Added ${description} to class ${classKey}`);
            e.target.reset();
        } catch (error) {
            showToast('Error adding file: ' + error.message, 'error');
        }
    }
});
DOMElements.classFilesModal.addEventListener('click', (e) => {
    if (e.target.id === 'generateClassFileLinkBtn') {
        const shareLink = document.getElementById('classGoogleDriveLink').value.trim();
        const fileLinkInput = document.getElementById('classFileLink');
        if (!shareLink) {
            showToast('Please paste a Google Drive share link first.', 'error');
            return;
        }
        const match = shareLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            fileLinkInput.value = `https://drive.google.com/uc?export=download&id=${match[1]}`;
            showToast('Download link generated!', 'success');
        } else {
            showToast('Invalid Google Drive share link format.', 'error');
        }
    }

    const deleteBtn = e.target.closest('.delete-class-file-btn');
    if (deleteBtn) {
        const classKey = deleteBtn.dataset.classKey;
        const fileKey = deleteBtn.dataset.fileKey;
        const fileDescription = deleteBtn.closest('tr').querySelector('td').textContent;

        DOMElements.confirmationTitle.textContent = 'Confirm File Deletion';
        DOMElements.confirmationMessage.textContent = `Are you sure you want to remove "${fileDescription}" from this class?`;
        DOMElements.confirmationModal.style.display = 'flex';

        AppState.actionHandler = async () => {
            await remove(ref(db, `classes/${classKey}/materials/${fileKey}`));
            showToast('File removed from class.', 'info');
            logAction('Class File Deleted', `Removed ${fileDescription} from class`);
            DOMElements.confirmationModal.style.display = 'none';
            AppState.actionHandler = null;
        };
    }
});
DOMElements.classFilesModalCloseBtn.addEventListener('click', () => {
    DOMElements.classFilesModal.style.display = 'none';
    const activeBtn = document.querySelector('.manage-files-btn.active-class-manager');
    if (activeBtn) {
        activeBtn.classList.remove('active-class-manager');
    }
});
DOMElements.studentAccessForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const key = DOMElements.classKeyInput.value.trim();
    if (!key) return;
    const classRef = ref(db, `classes/${key}`);
    const snapshot = await get(classRef);
    if (snapshot.exists()) {
        renderClassFilesForStudent(snapshot.val(), key);
    } else {
        showToast('Invalid class key. Please check and try again.', 'error');
        DOMElements.studentClassFilesContainer.innerHTML = '';
    }
});
DOMElements.studentClassFilesContainer.addEventListener('click', (e) => {
    const downloadButton = e.target.closest('.download-btn');
    if (downloadButton) {
        const link = downloadButton.dataset.link;
        window.open(link, '_blank');
    }
});
DOMElements.confirmActionBtn.addEventListener('click', () => {
    if (AppState.actionHandler) AppState.actionHandler();
});
DOMElements.cancelModalBtn.addEventListener('click', () => {
    DOMElements.confirmationModal.style.display = 'none';
    AppState.actionHandler = null;
});
document.querySelectorAll('.modal-back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});