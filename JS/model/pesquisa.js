const pesquisa = (()=>{
    const hospitaisComProcedimento = () => {
        const hospitalComProcedimentos = {};
        hospitals.forEach(hospital => {
            hospital.hospitalComProcedimentos.forEach(procedimento => {
                if (!hospitalComProcedimentos[procedimento]) {
                    hospitalComProcedimentos[procedimento] = [];
                }
                hospitalComProcedimentos[procedimento].push(hospital);
            });
        });
        return hospitalComProcedimentos;
    };
})