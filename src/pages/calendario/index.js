import './index.css';
import { state } from "../../state";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-cvjO5Ze1jUG5WRVd6pFPWHPq56vjJZc",
    authDomain: "espaciomelo-34e9a.firebaseapp.com",
    projectId: "espaciomelo-34e9a",
    storageBucket: "espaciomelo-34e9a.appspot.com",
    messagingSenderId: "90914534743",
    appId: "1:90914534743:web:fd53ebbe6384be9cc53a12"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const agendaRef = collection(db, "agenda");

export async function initPageCalendario(params) {
    const div = document.createElement("div");
    div.className = "contenedorCalendario";

    div.innerHTML = `
        <div id="calendar-container">
            <div id="calendar-header">
                <button id="prev-month">${"<"}</button>
                <h2 id="month-year"></h2>
                <button id="next-month">${">"}</button>
            </div>
            <div id="calendar-days">
                <!-- Los días del calendario se generarán aquí -->
            </div>
        </div>
        <div id="schedule-container">
            <h3>Horarios disponibles para <span id="selected-date"></span></h3>
            <div id="schedule-list">
                <!-- Los horarios disponibles se generarán aquí -->
            </div>

            <div class="contendorBotones">
                <button id="back-button">Atras</button>
                <button id="confirm-button">Confirmar</button>
            </div>
        </div>
        <wpp-component></wpp-component>
    `;

    // Variables y funciones para el calendario
    const calendarDays = div.querySelector('#calendar-days');
    const monthYear = div.querySelector('#month-year');
    const prevMonthButton = div.querySelector('#prev-month');
    const nextMonthButton = div.querySelector('#next-month');
    const scheduleContainer = div.querySelector('#schedule-container');
    const scheduleList = div.querySelector('#schedule-list');
    const selectedDateElement = div.querySelector('#selected-date');
    const confirmButton = div.querySelector('#confirm-button');

    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;

    // Cargar datos de Firebase
    async function loadReservedDates() {
        const querySnapshot = await getDocs(agendaRef);
        const reservedDates = state.getState().reservedDates;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const dateKey = `${data.date}-${data.time}`;
            reservedDates[dateKey] = true;
        });
        state.setState(state.getState()); // Actualizar el estado
        renderCalendar(); // Renderizar el calendario después de cargar los datos
    }

    function renderCalendar() {
        calendarDays.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        monthYear.textContent = `${currentDate.toLocaleString('es-ES', { month: 'long' })} ${year}`;

        prevMonthButton.disabled = (currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth());

        if (!(currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth())) {
            for (let i = 0; i < firstDay; i++) {
                calendarDays.appendChild(document.createElement('div'));
            }
        }

        for (let date = 1; date <= lastDate; date++) {
            const dayElement = document.createElement('div');
            const dayOfWeek = new Date(year, month, date).toLocaleDateString('es-ES', { weekday: 'long' });
            dayElement.innerHTML = `
                <div class="date">${date}</div>
                <div class="day">${dayOfWeek}</div>
            `;
            dayElement.className = 'day-container';

            const thisDate = new Date(year, month, date);
            const dateKey = thisDate.toDateString();

            if (thisDate < today) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.addEventListener('click', () => {
                    div.querySelectorAll('.day-container').forEach(el => el.classList.remove('selected'));
                    dayElement.classList.add('selected');
                    selectedDate = thisDate;
                    selectedDateElement.textContent = selectedDate.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    scheduleContainer.style.display = 'block';
                    renderSchedules();
                });
            }

            if (!(currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth() && date < today.getDate())) {
                calendarDays.appendChild(dayElement);
            }
        }
    }

    function renderSchedules() {
        scheduleList.innerHTML = '';
        const schedules = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
        const reservedDates = state.getState().reservedDates;
    
        if (selectedDate === null) {
            // Manejo cuando no hay fecha seleccionada
            schedules.forEach(schedule => {
                const scheduleElement = document.createElement('div');
                scheduleElement.textContent = schedule;
                scheduleElement.className = 'schedule disabled'; // Todos los horarios están deshabilitados
                scheduleList.appendChild(scheduleElement);
            });
            return;
        }
    
        const dateKeyPrefix = selectedDate.toISOString().split('T')[0];
    
        schedules.forEach(schedule => {
            const fullKey = `${dateKeyPrefix}-${schedule}`;
            const scheduleElement = document.createElement('div');
            scheduleElement.textContent = schedule;
            scheduleElement.className = 'schedule';
    
            if (reservedDates[fullKey]) {
                scheduleElement.classList.add('disabled');
            } else {
                scheduleElement.addEventListener('click', () => {
                    div.querySelectorAll('.schedule').forEach(el => el.classList.remove('selected'));
                    scheduleElement.classList.add('selected');
                    selectedTime = schedule;
                });
            }
    
            scheduleList.appendChild(scheduleElement);
        });
    }

    div.querySelector("#back-button").addEventListener("click", (e) => {
        e.preventDefault();
        const cs = state.getState();
        cs.list.pop();
        state.setState(cs);
        params.goTo("/inicio");
    });

    confirmButton.addEventListener('click', () => {
        if (selectedDate && selectedTime) {
            const dateKey = `${selectedDate.toISOString().split('T')[0]}-${selectedTime}`;
            state.addReservedDate(dateKey);
            const formattedDate = formatDate(selectedDate);
            const cs = state.getState();
            const ultimoElem = cs.list[cs.list.length - 1];
            ultimoElem.fecha = formattedDate;
            ultimoElem.horario = selectedTime;
            cs.list.pop();
            state.addItem(ultimoElem);
            state.sumCarrito()
            params.goTo("/inicio");
        } else {
            alert('Por favor, seleccione una fecha y un horario antes de confirmar.');
        }
    });

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Cargar las fechas reservadas y luego renderizar el calendario
    await loadReservedDates();

    return div;
}
