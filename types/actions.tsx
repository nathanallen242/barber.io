import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';

const clientActions = [
    {
        icon: <MaterialIcons name="schedule" size={24} color="#537580" />,
        title: 'Book an Appointment',
        description: 'Find a licensed barber',
        backgroundColor: '#b5d2f5'
    },
    {
        icon: <MaterialIcons name="qr-code-2" size={24} color="#5a8a62" />,
        title: 'Appointment with QR',
        description: 'Queuing without the hustle',
        backgroundColor: '#b5f5c1'
    },
    {
        icon: <Entypo name="chat" size={24} color="#7a5e62" />,
        title: 'Request Consultation',
        description: 'Talk to registered professionals',
        backgroundColor: '#f2c8a2'
    },
    {
        icon: <Entypo name="location" size={24} color="#594346" />,
        title: 'Locate Professionals',
        description: 'Locate barbers near you',
        backgroundColor: '#f7c1c8'
    },
];

const barberActions = [
    {
        icon: <MaterialIcons name="event-available" size={24} color="#3f51b5" />,
        title: 'View Recent Appointments',
        description: 'Quickly access your upcoming and past appointments.',
        backgroundColor: '#bbdefb'
    },
    {
        icon: <FontAwesome name="image" size={24} color="#4caf50" />,
        title: 'Post Appointment Pictures',
        description: 'Showcase your best work in the gallery.',
        backgroundColor: '#c8e6c9'
    },
    {
        icon: <MaterialIcons name="dashboard" size={24} color="#ff9800" />,
        title: 'View Dashboard',
        description: 'See your earnings and performance statistics.',
        backgroundColor: '#ffe0b2'
    },
    {
        icon: <MaterialIcons name="av-timer" size={24} color="#9c27b0" />, 
        title: 'Update Availability',
        description: 'Manage your working hours and available slots.',
        backgroundColor: '#e1bee7'
    },
];

export { clientActions, barberActions };