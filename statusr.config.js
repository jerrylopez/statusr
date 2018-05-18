const config = {
    github: {
        username: "jerrylopez",
        repository: "dus-demo",
    },
    service: {
        labels: [
            "API",
            "Account Services",
            "Content Management System",
            "Payment Services"
        ]
    },
    status: {
        // The status shown when a service does not have a status paired with it on an issue.
        default: "Operational",
        defaultColor: "#00b894",
        labels: [
            "Under Maintenance",
            "Degraded Performance",
            "Partial Outage",
            "Major Outage"
        ]
    }
}

export default config