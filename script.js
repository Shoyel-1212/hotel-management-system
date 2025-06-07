document.addEventListener('DOMContentLoaded', function() {
    // Sample data for the system
    const sampleData = {
        rooms: [
            { number: '101', type: 'Standard', floor: 1, capacity: 2, price: 120, amenities: ['wifi', 'tv'], status: 'available' },
            { number: '201', type: 'Deluxe', floor: 2, capacity: 2, price: 180, amenities: ['wifi', 'tv', 'minibar'], status: 'occupied' },
            { number: '301', type: 'Suite', floor: 3, capacity: 4, price: 280, amenities: ['wifi', 'tv', 'minibar', 'jacuzzi'], status: 'available' },
            { number: '102', type: 'Standard', floor: 1, capacity: 2, price: 120, amenities: ['wifi', 'tv'], status: 'maintenance' }
        ],
        guests: [
            { id: 'GH-1001', firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', phone: '+1 555-123-4567', idType: 'passport', idNumber: 'P12345678', lastStay: 'Jun 3, 2025' },
            { id: 'GH-1002', firstName: 'Emily', lastName: 'Johnson', email: 'emily.j@example.com', phone: '+1 555-987-6543', idType: 'driver-license', idNumber: 'DL87654321', lastStay: 'Jun 5, 2025' },
            { id: 'GH-1003', firstName: 'Robert', lastName: 'Brown', email: 'robert.b@example.com', phone: '+1 555-456-7890', idType: 'passport', idNumber: 'P98765432', lastStay: 'Jun 10, 2025' }
        ],
        staff: [
            { id: 'GH-S1001', firstName: 'Sarah', lastName: 'Johnson', position: 'Front Desk Manager', department: 'reception', email: 'sarah.j@hotel.com', phone: '+1 555-111-2222', status: 'active' },
            { id: 'GH-S1002', firstName: 'Michael', lastName: 'Brown', position: 'Head Housekeeper', department: 'housekeeping', email: 'michael.b@hotel.com', phone: '+1 555-222-3333', status: 'active' },
            { id: 'GH-S1003', firstName: 'Emily', lastName: 'Davis', position: 'Executive Chef', department: 'kitchen', email: 'emily.d@hotel.com', phone: '+1 555-333-4444', status: 'on-leave' }
        ],
        reservations: [
            { id: 'GH-R1256', guestId: 'GH-1001', room: '201', checkIn: 'Jun 3, 2025', checkOut: 'Jun 7, 2025', total: 720, status: 'confirmed' },
            { id: 'GH-R1255', guestId: 'GH-1002', room: '305', checkIn: 'Jun 3, 2025', checkOut: 'Jun 5, 2025', total: 360, status: 'checked-in' },
            { id: 'GH-R1254', guestId: 'GH-1003', room: '401', checkIn: 'Jun 2, 2025', checkOut: 'Jun 10, 2025', total: 2240, status: 'checked-in' }
        ],
        reports: {
            occupancy: [
                { date: 'Jun 1, 2025', occupied: 78, available: 42, occupancy: 65, roomRevenue: 9360, fbRevenue: 2150, otherRevenue: 780, totalRevenue: 12290 },
                { date: 'Jun 2, 2025', occupied: 82, available: 38, occupancy: 68.3, roomRevenue: 9840, fbRevenue: 2430, otherRevenue: 920, totalRevenue: 13190 },
                { date: 'Jun 3, 2025', occupied: 84, available: 36, occupancy: 70, roomRevenue: 10080, fbRevenue: 2680, otherRevenue: 1050, totalRevenue: 13810 },
                { date: 'Jun 4, 2025', occupied: 80, available: 40, occupancy: 66.7, roomRevenue: 9600, fbRevenue: 2450, otherRevenue: 890, totalRevenue: 12940 },
                { date: 'Jun 5, 2025', occupied: 76, available: 44, occupancy: 63.3, roomRevenue: 9120, fbRevenue: 2100, otherRevenue: 750, totalRevenue: 11970 }
            ]
        }
    };

    // Navigation tabs functionality
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the selected section
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.style.display = 'block';
                
                // Initialize specific section if needed
                if (this.getAttribute('href') === '#reservations') {
                    generateCalendar();
                } else if (this.getAttribute('href') === '#reports') {
                    generateCharts();
                }
            }
        });
    });
    
    // Set dashboard as active by default
    document.querySelector('.navbar a[href="#dashboard"]').click();
    
    // Notification dropdown functionality
    const notification = document.querySelector('.notification');
    notification.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = this.querySelector('.notification-dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // User profile dropdown functionality
    const userProfile = document.querySelector('.user-profile');
    userProfile.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = this.querySelector('.profile-dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelector('.notification-dropdown').style.display = 'none';
        document.querySelector('.profile-dropdown').style.display = 'none';
    });
    
    // Quick action buttons functionality
    document.getElementById('quickNewBooking').addEventListener('click', function() {
        document.querySelector('.navbar a[href="#reservations"]').click();
        setTimeout(() => {
            document.getElementById('newReservationBtn').click();
        }, 100);
    });
    
    document.getElementById('quickAddGuest').addEventListener('click', function() {
        document.querySelector('.navbar a[href="#guests"]').click();
        setTimeout(() => {
            document.getElementById('addGuestBtn').click();
        }, 100);
    });
    
    document.getElementById('quickGenerateInvoice').addEventListener('click', function() {
        alert('Invoice generation functionality would be implemented here');
    });
    
    document.getElementById('quickSendNotification').addEventListener('click', function() {
        alert('Notification sending functionality would be implemented here');
    });
    
    // Table row click functionality
    const tableRows = document.querySelectorAll('table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON' && !e.target.closest('.action-dropdown')) {
                const bookingId = this.cells[0].textContent;
                alert(`Details for ${bookingId} would show here`);
            }
        });
    });

    // Room Management Functionality
    const addRoomBtn = document.getElementById('addRoomBtn');
    const addRoomModal = document.getElementById('addRoomModal');
    const editRoomModal = document.getElementById('editRoomModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const roomForm = document.getElementById('roomForm');
    const editRoomForm = document.getElementById('editRoomForm');

    // Open add room modal
    addRoomBtn.addEventListener('click', function() {
        addRoomModal.style.display = 'block';
    });

    // Open edit room modal
    document.querySelectorAll('.edit-room').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const roomData = sampleData.rooms.find(r => r.number === row.cells[0].textContent);
            
            if (roomData) {
                document.getElementById('editRoomNumber').value = roomData.number;
                document.getElementById('editRoomType').value = roomData.type.toLowerCase();
                document.getElementById('editRoomFloor').value = roomData.floor;
                document.getElementById('editRoomCapacity').value = roomData.capacity;
                document.getElementById('editRoomPrice').value = roomData.price;
                document.getElementById('editRoomStatus').value = roomData.status;
                
                // Set amenities checkboxes
                document.querySelectorAll('input[name="editAmenities"]').forEach(checkbox => {
                    checkbox.checked = roomData.amenities.includes(checkbox.value);
                });
                
                editRoomModal.style.display = 'block';
            }
        });
    });

    // Delete room
    document.querySelectorAll('.delete-room').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this room?')) {
                alert('Room would be deleted in a real implementation');
            }
        });
    });

    // Close modals
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Add room form submission
    roomForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const roomNumber = document.getElementById('roomNumber').value;
        const roomType = document.getElementById('roomType').value;
        const roomFloor = document.getElementById('roomFloor').value;
        const roomCapacity = document.getElementById('roomCapacity').value;
        const roomPrice = document.getElementById('roomPrice').value;
        
        // Get selected amenities
        const amenitiesCheckboxes = document.querySelectorAll('input[name="amenities"]:checked');
        const amenities = Array.from(amenitiesCheckboxes).map(cb => cb.value);
        
        // In a real app, you would send this data to the server
        console.log('New room:', {
            number: roomNumber,
            type: roomType,
            floor: roomFloor,
            capacity: roomCapacity,
            price: roomPrice,
            amenities: amenities,
            status: 'available'
        });
        
        // Show success message
        alert('Room added successfully!');
        
        // Close modal and reset form
        addRoomModal.style.display = 'none';
        roomForm.reset();
    });

    // Edit room form submission
    editRoomForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const roomNumber = document.getElementById('editRoomNumber').value;
        const roomType = document.getElementById('editRoomType').value;
        const roomFloor = document.getElementById('editRoomFloor').value;
        const roomCapacity = document.getElementById('editRoomCapacity').value;
        const roomPrice = document.getElementById('editRoomPrice').value;
        const roomStatus = document.getElementById('editRoomStatus').value;
        
        // Get selected amenities
        const amenitiesCheckboxes = document.querySelectorAll('input[name="editAmenities"]:checked');
        const amenities = Array.from(amenitiesCheckboxes).map(cb => cb.value);
        
        // In a real app, you would send this data to the server
        console.log('Updated room:', {
            number: roomNumber,
            type: roomType,
            floor: roomFloor,
            capacity: roomCapacity,
            price: roomPrice,
            amenities: amenities,
            status: roomStatus
        });
        
        // Show success message
        alert('Room updated successfully!');
        
        // Close modal
        editRoomModal.style.display = 'none';
    });

    // Filter functionality
    const roomTypeFilter = document.getElementById('roomTypeFilter');
    const roomStatusFilter = document.getElementById('roomStatusFilter');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    const roomsTable = document.getElementById('roomsTable').getElementsByTagName('tbody')[0];

    function filterRooms() {
        const typeValue = roomTypeFilter.value.toLowerCase();
        const statusValue = roomStatusFilter.value.toLowerCase();
        const rows = roomsTable.getElementsByTagName('tr');
        
        for (let row of rows) {
            const type = row.cells[1].textContent.toLowerCase();
            const status = row.cells[6].textContent.toLowerCase();
            
            const typeMatch = typeValue === 'all' || type === typeValue;
            const statusMatch = statusValue === 'all' || status === statusValue;
            
            row.style.display = typeMatch && statusMatch ? '' : 'none';
        }
    }

    roomTypeFilter.addEventListener('change', filterRooms);
    roomStatusFilter.addEventListener('change', filterRooms);

    resetFiltersBtn.addEventListener('click', function() {
        roomTypeFilter.value = 'all';
        roomStatusFilter.value = 'all';
        filterRooms();
    });

    // Guest Management Functionality
    const guestSearch = document.getElementById('guestSearch');
    const addGuestBtn = document.getElementById('addGuestBtn');
    const addGuestModal = document.getElementById('addGuestModal');
    const guestForm = document.getElementById('guestForm');

    // Guest search functionality
    guestSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#guestsTable tbody tr');
        
        for (let row of rows) {
            const name = row.cells[1].textContent.toLowerCase();
            const contact = row.cells[2].textContent.toLowerCase();
            const email = row.cells[3].textContent.toLowerCase();
            
            const match = name.includes(searchTerm) || 
                          contact.includes(searchTerm) || 
                          email.includes(searchTerm);
            
            row.style.display = match ? '' : 'none';
        }
    });

    // Add guest modal
    addGuestBtn.addEventListener('click', function() {
        addGuestModal.style.display = 'block';
    });

    // Guest form submission
    guestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('guestFirstName').value;
        const lastName = document.getElementById('guestLastName').value;
        const email = document.getElementById('guestEmail').value;
        const phone = document.getElementById('guestPhone').value;
        const idType = document.getElementById('guestIdType').value;
        const idNumber = document.getElementById('guestIdNumber').value;
        const address = document.getElementById('guestAddress').value;
        const country = document.getElementById('guestCountry').value;
        
        // In a real app, you would send this data to the server
        console.log('New guest:', {
            firstName,
            lastName,
            email,
            phone,
            idType,
            idNumber,
            address,
            country
        });
        
        // Show success message
        alert('Guest added successfully!');
        
        // Close modal and reset form
        addGuestModal.style.display = 'none';
        guestForm.reset();
    });

    // Edit guest
    document.querySelectorAll('.edit-guest').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const guestId = this.closest('tr').cells[0].textContent;
            const guest = sampleData.guests.find(g => g.id === guestId);
            
            if (guest) {
                alert(`Edit guest ${guestId} (${guest.firstName} ${guest.lastName}) would be implemented here`);
            }
        });
    });

    // Delete guest
    document.querySelectorAll('.delete-guest').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const guestId = this.closest('tr').cells[0].textContent;
            
            if (confirm(`Are you sure you want to delete guest ${guestId}?`)) {
                alert(`Guest ${guestId} would be deleted in a real implementation`);
            }
        });
    });

    // View guest
    document.querySelectorAll('.view-guest').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const guestId = this.closest('tr').cells[0].textContent;
            const guest = sampleData.guests.find(g => g.id === guestId);
            
            if (guest) {
                alert(`Viewing details for ${guest.firstName} ${guest.lastName}\nEmail: ${guest.email}\nPhone: ${guest.phone}`);
            }
        });
    });

    // Pagination
    document.getElementById('prevPage').addEventListener('click', function() {
        alert('Previous page would be loaded');
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        alert('Next page would be loaded');
    });

    // Staff Management Functionality
    const addStaffBtn = document.getElementById('addStaffBtn');
    const addStaffModal = document.getElementById('addStaffModal');
    const staffForm = document.getElementById('staffForm');
    const departmentBtns = document.querySelectorAll('.staff-departments .btn');

    // Add staff modal
    addStaffBtn.addEventListener('click', function() {
        addStaffModal.style.display = 'block';
    });

    // Staff form submission
    staffForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('staffFirstName').value;
        const lastName = document.getElementById('staffLastName').value;
        const email = document.getElementById('staffEmail').value;
        const phone = document.getElementById('staffPhone').value;
        const position = document.getElementById('staffPosition').value;
        const department = document.getElementById('staffDepartment').value;
        const hireDate = document.getElementById('staffHireDate').value;
        const salary = document.getElementById('staffSalary').value;
        const status = document.getElementById('staffStatus').value;
        
        // In a real app, you would send this data to the server
        console.log('New staff:', {
            firstName,
            lastName,
            email,
            phone,
            position,
            department,
            hireDate,
            salary,
            status
        });
        
        // Show success message
        alert('Staff member added successfully!');
        
        // Close modal and reset form
        addStaffModal.style.display = 'none';
        staffForm.reset();
    });

    // Department filter
    departmentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            departmentBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const department = this.getAttribute('data-department');
            const rows = document.querySelectorAll('#staffTable tbody tr');
            
            if (department === 'all') {
                rows.forEach(row => row.style.display = '');
                return;
            }
            
            rows.forEach(row => {
                const rowDept = row.getAttribute('data-department');
                row.style.display = rowDept === department ? '' : 'none';
            });
        });
    });

    // Edit staff
    document.querySelectorAll('.edit-staff').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const staffId = this.closest('tr').cells[0].textContent;
            const staff = sampleData.staff.find(s => s.id === staffId);
            
            if (staff) {
                alert(`Edit staff ${staffId} (${staff.firstName} ${staff.lastName}) would be implemented here`);
            }
        });
    });

    // Delete staff
    document.querySelectorAll('.delete-staff').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const staffId = this.closest('tr').cells[0].textContent;
            
            if (confirm(`Are you sure you want to delete staff ${staffId}?`)) {
                alert(`Staff ${staffId} would be deleted in a real implementation`);
            }
        });
    });

    // View staff
    document.querySelectorAll('.view-staff').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const staffId = this.closest('tr').cells[0].textContent;
            const staff = sampleData.staff.find(s => s.id === staffId);
            
            if (staff) {
                alert(`Viewing details for ${staff.firstName} ${staff.lastName}\nPosition: ${staff.position}\nDepartment: ${staff.department}\nEmail: ${staff.email}`);
            }
        });
    });

    // Reservation Management Functionality
    const newReservationBtn = document.getElementById('newReservationBtn');
    const newReservationModal = document.getElementById('newReservationModal');
    const reservationForm = document.getElementById('reservationForm');
    const applyReservationFilters = document.getElementById('applyReservationFilters');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthDisplay = document.getElementById('currentMonth');
    const calendarGrid = document.getElementById('calendarGrid');

    // New reservation modal
    newReservationBtn.addEventListener('click', function() {
        newReservationModal.style.display = 'block';
    });

    // Reservation form submission
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const guest = document.getElementById('reservationGuest').value;
        const room = document.getElementById('reservationRoom').value;
        const checkIn = document.getElementById('checkInDate').value;
        const checkOut = document.getElementById('checkOutDate').value;
        const adults = document.getElementById('reservationAdults').value;
        const children = document.getElementById('reservationChildren').value;
        const specialRequests = document.getElementById('reservationSpecialRequests').value;
        
        // In a real app, you would send this data to the server
        console.log('New reservation:', {
            guest,
            room,
            checkIn,
            checkOut,
            adults,
            children,
            specialRequests
        });
        
        // Show success message
        alert('Reservation created successfully!');
        
        // Close modal and reset form
        newReservationModal.style.display = 'none';
        reservationForm.reset();
    });

    // Apply reservation filters
    applyReservationFilters.addEventListener('click', function() {
        const status = document.getElementById('reservationStatus').value;
        const date = document.getElementById('reservationDate').value;
        
        alert(`Filters applied:\nStatus: ${status}\nDate: ${date || 'Not specified'}`);
    });

    // Calendar functionality
    let currentMonth = 5; // June (0-indexed)
    let currentYear = 2025;

    function generateCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        currentMonthDisplay.textContent = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
        
        // Clear previous calendar
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = day;
            
            // Check if this day has reservations
            const dateStr = `${currentMonth + 1}/${day}/${currentYear}`;
            const hasReservation = sampleData.reservations.some(res => {
                const resDate = new Date(res.checkIn);
                return resDate.getMonth() + 1 === currentMonth + 1 && resDate.getDate() === day;
            });
            
            if (hasReservation) {
                dayElement.classList.add('reserved');
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }

    // Month navigation
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar();
    });

    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar();
    });

    // Reservation actions
    document.querySelectorAll('.view-reservation').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const reservationId = this.closest('tr').cells[0].textContent;
            alert(`Viewing reservation ${reservationId}`);
        });
    });

    document.querySelectorAll('.edit-reservation').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const reservationId = this.closest('tr').cells[0].textContent;
            alert(`Editing reservation ${reservationId}`);
        });
    });

    document.querySelectorAll('.checkin-reservation').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const reservationId = this.closest('tr').cells[0].textContent;
            alert(`Checking in reservation ${reservationId}`);
        });
    });

    document.querySelectorAll('.checkout-reservation').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const reservationId = this.closest('tr').cells[0].textContent;
            alert(`Checking out reservation ${reservationId}`);
        });
    });

    document.querySelectorAll('.invoice-reservation').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const reservationId = this.closest('tr').cells[0].textContent;
            alert(`Generating invoice for reservation ${reservationId}`);
        });
    });

    document.querySelectorAll('.cancel-reservation').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const reservationId = this.closest('tr').cells[0].textContent;
            
            if (confirm(`Are you sure you want to cancel reservation ${reservationId}?`)) {
                alert(`Reservation ${reservationId} would be cancelled in a real implementation`);
            }
        });
    });

    // Reports Functionality
    const reportPeriod = document.getElementById('reportPeriod');
    const customDateRange = document.getElementById('customDateRange');
    const generateReportBtn = document.getElementById('generateReportBtn');
    const exportReportBtn = document.getElementById('exportReportBtn');
    const printReportBtn = document.getElementById('printReportBtn');

    // Show/hide custom date range
    reportPeriod.addEventListener('change', function() {
        customDateRange.style.display = this.value === 'custom' ? 'flex' : 'none';
    });

    // Generate report
    generateReportBtn.addEventListener('click', function() {
        const reportType = document.getElementById('reportType').value;
        const period = document.getElementById('reportPeriod').value;
        
        let startDate, endDate;
        if (period === 'custom') {
            startDate = document.getElementById('startDate').value;
            endDate = document.getElementById('endDate').value;
        }
        
        alert(`Generating ${reportType} report for ${period} period` + 
              (period === 'custom' ? ` (${startDate} to ${endDate})` : ''));
    });

    // Export report
    exportReportBtn.addEventListener('click', function() {
        alert('Report would be exported in CSV format');
    });

    // Print report
    printReportBtn.addEventListener('click', function() {
        window.print();
    });

    // Generate charts
    function generateCharts() {
        // Occupancy chart
        const occupancyCtx = document.getElementById('occupancyChartCanvas').getContext('2d');
        new Chart(occupancyCtx, {
            type: 'line',
            data: {
                labels: sampleData.reports.occupancy.map(r => r.date),
                datasets: [{
                    label: 'Occupancy Rate (%)',
                    data: sampleData.reports.occupancy.map(r => r.occupancy),
                    borderColor: 'rgba(58, 134, 255, 1)',
                    backgroundColor: 'rgba(58, 134, 255, 0.1)',
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        // Revenue chart
        const revenueCtx = document.getElementById('revenueChartCanvas').getContext('2d');
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: sampleData.reports.occupancy.map(r => r.date),
                datasets: [
                    {
                        label: 'Room Revenue',
                        data: sampleData.reports.occupancy.map(r => r.roomRevenue),
                        backgroundColor: 'rgba(58, 134, 255, 0.7)'
                    },
                    {
                        label: 'F&B Revenue',
                        data: sampleData.reports.occupancy.map(r => r.fbRevenue),
                        backgroundColor: 'rgba(6, 214, 160, 0.7)'
                    },
                    {
                        label: 'Other Revenue',
                        data: sampleData.reports.occupancy.map(r => r.otherRevenue),
                        backgroundColor: 'rgba(255, 190, 11, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        });
    }
});
// Add this code to your existing script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Sample data for the system
    const sampleData = {
        rooms: [
            { number: '101', type: 'Standard', floor: 1, capacity: 2, price: 120, amenities: ['wifi', 'tv'], status: 'available' },
            { number: '201', type: 'Deluxe', floor: 2, capacity: 2, price: 180, amenities: ['wifi', 'tv', 'minibar'], status: 'occupied' },
            { number: '301', type: 'Suite', floor: 3, capacity: 4, price: 280, amenities: ['wifi', 'tv', 'minibar', 'jacuzzi'], status: 'available' },
            { number: '102', type: 'Standard', floor: 1, capacity: 2, price: 120, amenities: ['wifi', 'tv'], status: 'maintenance' }
        ],
        guests: [
            { id: 'GH-1001', firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', phone: '+1 555-123-4567', idType: 'passport', idNumber: 'P12345678', lastStay: 'Jun 3, 2025' },
            { id: 'GH-1002', firstName: 'Emily', lastName: 'Johnson', email: 'emily.j@example.com', phone: '+1 555-987-6543', idType: 'driver-license', idNumber: 'DL87654321', lastStay: 'Jun 5, 2025' },
            { id: 'GH-1003', firstName: 'Robert', lastName: 'Brown', email: 'robert.b@example.com', phone: '+1 555-456-7890', idType: 'passport', idNumber: 'P98765432', lastStay: 'Jun 10, 2025' }
        ],
        staff: [
            { id: 'GH-S1001', firstName: 'Sarah', lastName: 'Johnson', position: 'Front Desk Manager', department: 'reception', email: 'sarah.j@hotel.com', phone: '+1 555-111-2222', status: 'active' },
            { id: 'GH-S1002', firstName: 'Michael', lastName: 'Brown', position: 'Head Housekeeper', department: 'housekeeping', email: 'michael.b@hotel.com', phone: '+1 555-222-3333', status: 'active' },
            { id: 'GH-S1003', firstName: 'Emily', lastName: 'Davis', position: 'Executive Chef', department: 'kitchen', email: 'emily.d@hotel.com', phone: '+1 555-333-4444', status: 'on-leave' }
        ],
        reservations: [
            { id: 'GH-R1256', guestId: 'GH-1001', room: '201', checkIn: 'Jun 3, 2025', checkOut: 'Jun 7, 2025', total: 720, status: 'confirmed' },
            { id: 'GH-R1255', guestId: 'GH-1002', room: '305', checkIn: 'Jun 3, 2025', checkOut: 'Jun 5, 2025', total: 360, status: 'checked-in' },
            { id: 'GH-R1254', guestId: 'GH-1003', room: '401', checkIn: 'Jun 2, 2025', checkOut: 'Jun 10, 2025', total: 2240, status: 'checked-in' }
        ],
        roomService: [
            {
                id: 'RS-1001',
                room: '201',
                items: '2x Burger, 1x Fries, 1x Soda',
                total: '$24.50',
                status: 'preparing',
                time: 'Jun 3, 2025 12:30 PM',
                instructions: 'No onions in the burger'
            },
            {
                id: 'RS-1002',
                room: '305',
                items: '1x Salad, 1x Soup',
                total: '$15.00',
                status: 'delivered',
                time: 'Jun 3, 2025 1:15 PM',
                instructions: 'Extra dressing on the side'
            }
        ],
        reports: {
            occupancy: [
                { date: 'Jun 1, 2025', occupied: 78, available: 42, occupancy: 65, roomRevenue: 9360, fbRevenue: 2150, otherRevenue: 780, totalRevenue: 12290 },
                { date: 'Jun 2, 2025', occupied: 82, available: 38, occupancy: 68.3, roomRevenue: 9840, fbRevenue: 2430, otherRevenue: 920, totalRevenue: 13190 },
                { date: 'Jun 3, 2025', occupied: 84, available: 36, occupancy: 70, roomRevenue: 10080, fbRevenue: 2680, otherRevenue: 1050, totalRevenue: 13810 },
                { date: 'Jun 4, 2025', occupied: 80, available: 40, occupancy: 66.7, roomRevenue: 9600, fbRevenue: 2450, otherRevenue: 890, totalRevenue: 12940 },
                { date: 'Jun 5, 2025', occupied: 76, available: 44, occupancy: 63.3, roomRevenue: 9120, fbRevenue: 2100, otherRevenue: 750, totalRevenue: 11970 }
            ]
        }
    };

    // ======================
    // 1. CHATBOT IMPLEMENTATION
    // ======================
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWidget = document.querySelector('.chatbot-widget');
    const closeChatbot = document.querySelector('.close-chatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendChatbotMessage = document.getElementById('sendChatbotMessage');

    // Sample responses
    const chatbotResponses = {
        "hello": ["Hello! Welcome to Grand Horizon Hotel. How can I assist you today?", "Hi there! How may I help you?"],
        "booking": ["You can make a booking through our website or by calling our reservation desk.", "Would you like me to check room availability for you?"],
        "check in": ["Check-in time is at 3 PM. Early check-in may be available upon request.", "Our standard check-in time is 3 PM. Would you like to request an early check-in?"],
        "check out": ["Check-out time is at 11 AM. Late check-out may be available with additional charges.", "You need to check out by 11 AM. Can I assist with luggage storage?"],
        "amenities": ["We offer WiFi, swimming pool, fitness center, spa, and 24/7 room service.", "Our amenities include free WiFi, pool, gym, and restaurant. Anything specific you're interested in?"],
        "restaurant": ["We have a 24/7 restaurant serving international cuisine. Breakfast is served from 6-10 AM.", "Our restaurant is open all day. Would you like to hear today's specials?"],
        "payment": ["We accept all major credit cards and cash payments.", "You can pay with Visa, MasterCard, or American Express. Mobile payments are also accepted."],
        "room service": ["Room service is available 24/7. You can place an order through your room phone or our mobile app.", "Our room service menu includes a variety of options. Would you like to hear today's specials?"],
        "default": ["I'm sorry, I didn't understand that. Could you rephrase your question?", "I'm still learning. Could you ask that in a different way?"]
    };

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', () => {
        chatbotWidget.classList.toggle('active');
    });

    closeChatbot.addEventListener('click', () => {
        chatbotWidget.classList.remove('active');
    });

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Simulate typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-message bot';
        typingIndicator.textContent = '...';
        chatbotMessages.appendChild(typingIndicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Simulate bot response delay
        setTimeout(() => {
            chatbotMessages.removeChild(typingIndicator);
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `chatbot-message ${sender}`;
        messageElement.textContent = text;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Get bot response
    function getBotResponse(input) {
        input = input.toLowerCase();
        
        // Check for keywords
        for (const [keyword, responses] of Object.entries(chatbotResponses)) {
            if (input.includes(keyword)) {
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        
        // Default response
        return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
    }

    // Event listeners
    sendChatbotMessage.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Initial greeting
    setTimeout(() => {
        addMessage("Hello! I'm your Grand Horizon assistant. How can I help you today?", 'bot');
    }, 1000);

    // ======================
    // 2. PAYMENT INTEGRATION
    // ======================
    // Initialize Stripe (use your test publishable key)
    const stripe = Stripe('pk_test_your_publishable_key_here');
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    
    // Add card element to payment form
    cardElement.mount('#card-element');

    // Handle real-time validation errors from the card Element
    cardElement.addEventListener('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    // Modify reservation form submission to handle payments
    document.getElementById('reservationForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Collect reservation data
        const reservationData = {
            guest: document.getElementById('reservationGuest').value,
            room: document.getElementById('reservationRoom').value,
            checkIn: document.getElementById('checkInDate').value,
            checkOut: document.getElementById('checkOutDate').value,
            adults: document.getElementById('reservationAdults').value,
            children: document.getElementById('reservationChildren').value,
            specialRequests: document.getElementById('reservationSpecialRequests').value
        };
        
        // Calculate total (simplified for demo)
        const room = sampleData.rooms.find(r => r.number === reservationData.room.split(' - ')[0]);
        const nights = Math.ceil((new Date(reservationData.checkOut) - new Date(reservationData.checkIn)) / (1000 * 60 * 60 * 24));
        const total = room.price * nights;
        
        // For demo purposes, we'll simulate the payment process
        try {
            // In a real app, you would send this to your backend to create a payment intent
            // const response = await fetch('/create-payment-intent', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         amount: total * 100, // Amount in cents
            //         currency: 'usd',
            //         description: `Room ${reservationData.room} from ${reservationData.checkIn} to ${reservationData.checkOut}`
            //     }),
            // });
            // const { clientSecret } = await response.json();
            
            // Then confirm the payment
            // const result = await stripe.confirmCardPayment(clientSecret, {
            //     payment_method: {
            //         card: cardElement,
            //         billing_details: {
            //             name: reservationData.guest.split(' - ')[1] || 'Guest',
            //         },
            //     }
            // });
            
            // For demo, we'll simulate a successful payment
            alert(`Payment of $${total} processed successfully! Reservation confirmed.`);
            
            // Add to sample data (in a real app, this would be saved to your database)
            const newReservation = {
                id: `GH-R${Math.floor(1000 + Math.random() * 9000)}`,
                guestId: reservationData.guest.split(' - ')[0],
                room: reservationData.room.split(' - ')[0],
                checkIn: reservationData.checkIn,
                checkOut: reservationData.checkOut,
                total: total,
                status: 'confirmed'
            };
            sampleData.reservations.push(newReservation);
            
            // Close modal and reset form
            document.getElementById('newReservationModal').style.display = 'none';
            document.getElementById('reservationForm').reset();
            
            // Refresh reservations table
            document.querySelector('.navbar a[href="#reservations"]').click();
        } catch (error) {
            console.error('Error:', error);
            alert('Payment failed. Please try again.');
        }
    });

    // ======================
    // 3. ROOM SERVICE TRACKING
    // ======================
    const newRoomServiceBtn = document.getElementById('newRoomServiceBtn');
    const newRoomServiceModal = document.getElementById('newRoomServiceModal');
    const roomServiceForm = document.getElementById('roomServiceForm');

    // Menu items with prices
    const menuItems = {
        burger: 12.00,
        fries: 5.00,
        salad: 10.00,
        soda: 2.50
    };

    // Open room service modal
    newRoomServiceBtn.addEventListener('click', function() {
        newRoomServiceModal.style.display = 'block';
    });

    // Calculate total when items change
    document.querySelectorAll('input[name="menuItem"], .item-quantity').forEach(input => {
        input.addEventListener('change', updateServiceTotal);
    });

    function updateServiceTotal() {
        let total = 0;
        document.querySelectorAll('input[name="menuItem"]:checked').forEach(checkbox => {
            const item = checkbox.value;
            const quantity = checkbox.closest('.menu-item').querySelector('.item-quantity').value;
            total += menuItems[item] * quantity;
        });
        document.getElementById('serviceTotal').textContent = `$${total.toFixed(2)}`;
    }

    // Room service form submission
    roomServiceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const room = document.getElementById('serviceRoom').value;
        const instructions = document.getElementById('specialInstructions').value;
        
        // Get selected items
        const items = [];
        document.querySelectorAll('input[name="menuItem"]:checked').forEach(checkbox => {
            const item = checkbox.value;
            const quantity = checkbox.closest('.menu-item').querySelector('.item-quantity').value;
            if (quantity > 0) {
                items.push(`${quantity}x ${item.charAt(0).toUpperCase() + item.slice(1)}`);
            }
        });
        
        if (items.length === 0) {
            alert('Please select at least one item');
            return;
        }
        
        // Calculate total
        const total = document.getElementById('serviceTotal').textContent;
        
        // Create new order
        const orderId = `RS-${Math.floor(1000 + Math.random() * 9000)}`;
        const orderTime = new Date().toLocaleString();
        
        // Add to sample data
        sampleData.roomService.push({
            id: orderId,
            room,
            items: items.join(', '),
            total,
            status: 'preparing',
            time: orderTime,
            instructions
        });
        
        // Update UI
        updateRoomServiceTable();
        
        alert(`Room service order placed for Room ${room}!\nOrder ID: ${orderId}\nTotal: ${total}`);
        
        // Close modal and reset form
        newRoomServiceModal.style.display = 'none';
        roomServiceForm.reset();
        document.getElementById('serviceTotal').textContent = '$0.00';
    });

    function updateRoomServiceTable() {
        const tbody = document.querySelector('#roomServiceTable tbody');
        tbody.innerHTML = '';
        
        sampleData.roomService.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.room}</td>
                <td>${order.items}</td>
                <td>${order.total}</td>
                <td><span class="status ${order.status === 'preparing' ? 'confirmed' : 'checked-in'}">${
                    order.status === 'preparing' ? 'Preparing' : 'Delivered'
                }</span></td>
                <td>${order.time}</td>
                <td>
                    <button class="btn btn-sm btn-primary view-order"><i class="fas fa-eye"></i></button>
                    ${order.status === 'preparing' ? 
                        `<button class="btn btn-sm btn-success complete-order"><i class="fas fa-check"></i></button>` : 
                        ''}
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add event listeners to new buttons
        document.querySelectorAll('.view-order').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.closest('tr').cells[0].textContent;
                const order = sampleData.roomService.find(o => o.id === orderId);
                if (order) {
                    alert(`Order Details:\n\nOrder ID: ${order.id}\nRoom: ${order.room}\nItems: ${order.items}\nTotal: ${order.total}\nStatus: ${order.status}\nTime: ${order.time}\nInstructions: ${order.instructions || 'None'}`);
                }
            });
        });
        
        document.querySelectorAll('.complete-order').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.closest('tr').cells[0].textContent;
                const order = sampleData.roomService.find(o => o.id === orderId);
                if (order) {
                    order.status = 'delivered';
                    updateRoomServiceTable();
                    alert(`Order ${orderId} marked as delivered!`);
                }
            });
        });
    }

    // Initialize room service table
    updateRoomServiceTable();

    // ... rest of your existing code (navigation, modals, etc.) ...
});
