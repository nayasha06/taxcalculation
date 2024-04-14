$(document).ready(function() {
    $('#taxForm').submit(function(event) {
        event.preventDefault();

        // Reset error icons
        $('.error-icon').hide();

        // Get form values
        let age = $('#age').val();
        let grossIncome = parseFloat($('#grossIncome').val());
        let extraIncome = parseFloat($('#extraIncome').val());
        let deductions = parseFloat($('#deductions').val());

        // Validate age
        if (!age) {
            $('#age').after('<span class="error-icon">&#9888;</span>');
            return;
        }

        // Validate numeric fields
        const fields = [
            { fieldId: 'grossIncome', fieldName: 'Gross Annual Income' },
            { fieldId: 'extraIncome', fieldName: 'Extra Income' },
            { fieldId: 'deductions', fieldName: 'Deductions' }
        ];

        let hasError = false;
        fields.forEach(field => {
            const value = parseFloat($('#' + field.fieldId).val());
            if (isNaN(value)) {
                $('#' + field.fieldId).after('<span class="error-icon">&#9888;</span>');
                hasError = true;
            }
        });

        if (hasError) {
            return;
        }

        // Perform tax calculation
        let overallIncome = grossIncome + extraIncome - deductions;
        let taxableAmount = Math.max(overallIncome - 8, 0);

        let taxRate = 0.3;
        if (age === '>=40 <60') {
            taxRate = 0.4;
        } else if (age === '>=60') {
            taxRate = 0.1;
        }

        let taxAmount = taxableAmount * taxRate;

        // Show result in modal
        let modalContent = `
            <p>Overall Income: ${overallIncome.toFixed(2)} Lakhs</p>
            <p>Taxable Amount: ${taxableAmount.toFixed(2)} Lakhs</p>
            <p>Tax Rate: ${(taxRate * 100).toFixed(0)}%</p>
            <p>Tax Amount: ${taxAmount.toFixed(2)} Lakhs</p>
        `;

        $('#modalBody').html(modalContent);
        $('#resultModal').modal('show');
    });
});