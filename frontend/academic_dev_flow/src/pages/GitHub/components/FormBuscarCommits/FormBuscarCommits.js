import { Form, Select, DatePicker, Button } from "antd";
import React, { useEffect, useState } from "react";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { useContextoCommits } from "../../context/ContextoCommits";
import { filtrarCommitsPorPeriodoEUsuario } from "../../../../services/githubIntegration/commitService";
import { NotificationManager } from "react-notifications";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";

const { RangePicker } = DatePicker;

const FormBuscarCommits = () => {
    const { dadosProjeto } = useContextoGlobalProjeto();
    const { commits, setCommits, setLoading } = useContextoCommits();
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [assignee, setAssignee] = useState(null);
    const [periodo, setPeriodo] = useState(null);
    const [day, setDay] = useState(null)
    const [month, setMonth] = useState(null)
    const [year, setYear] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [form] = Form.useForm()

    const optionsFiltro = [
        {
            value: 'day',
            label: 'Dia'
        },
        {
            value: 'month',
            label: 'Mês'
        },
        {
            value: 'year',
            label: 'Ano'
        },
        {
            value: 'interval',
            label: 'Intervalo'
        }
    ]

    const handleGetMembros = async () => {
        try {
            const response = await buscarMembrosPorProjeto(dadosProjeto.id);
            const resultados = response.data.map((item) => ({
                value: item.id,
                label: `${item.nome_membro} (${item.nome_grupo})`,
                user: item.usuario_github,
            }));
            setOptionsMembros(resultados);
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    const handleGetCommits = async () => {
        form.resetFields()
        setLoading(true)
        NotificationManager.info('Esta ação pode demorar um pouco, dependendo do volume de dados, pedimos que aguarde!')
        try {

            const parametros = {
                github_token: dadosProjeto.token,
                repository: dadosProjeto.nome_repo,
                username: assignee,
                period: periodo,
                day: day,
                month: month,
                year: year,
                start_date: startDate,
                end_date: endDate
            }

            const response = await filtrarCommitsPorPeriodoEUsuario(parametros)

            if (!response.error && response.data.length > 0) {
                setCommits(response.data)
            }
            setLoading(false)
    

        } catch (error) {
            setLoading(false)
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);

        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null) {
                await handleGetMembros();
            }
        };

        fetchData();
    }, [commits]);

    return (
        <Form form={form} style={{ display: "flex", gap: '20px'}}>
            <Form.Item>
                <Select
                    defaultValue={assignee}
                    allowClear
                    style={{width: '150px'}}
                    placeholder="Membro"
                    options={optionsMembros}
                    onChange={(value) => {
                        if (value !== null || value !== undefined){
                            const selectedOption = optionsMembros.find((option) => option.value === value);
                            if (selectedOption) {
                                setAssignee(selectedOption.user);
                            } else {
                                setAssignee(null);
                            }
                        } else {
                            setAssignee(null);
                        }
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Select
                    style={{width: '150px'}}
                    onChange={(value) => setPeriodo(value)}
                    options={optionsFiltro}
                    placeholder="Selecione"
                />
            </Form.Item>

            <Form.Item>
                {periodo === 'day' && (
                    <DatePicker
                        defaultValue={day}
                        picker="date"
                        onChange={(date) => { 
                            const formattedDate = new Date(date);
                            const year = formattedDate.getFullYear();
                            const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
                            const day = String(formattedDate.getDate()).padStart(2, '0');
                            const formattedDateString = `${year}-${month}-${day}`;
                            setDay(formattedDateString);
                        }}
                    />
                )}
                {periodo === 'month' && (
                    <DatePicker 
                        defaultValue={month}
                        picker="month" 
                        onChange={(date) => {
                            const selectedMonth = new Date(date).getMonth() + 1
                            const selectedYear = new Date(date).getFullYear();
                            setMonth(selectedMonth);
                            setYear(selectedYear);
                        }} 
                    />
                        
                
                )}
                {periodo === 'year' && (
                    <DatePicker 
                        defaultValue={year}
                        picker="year" 
                        onChange={(date) => {
                            const selectedYear = new Date(date).getFullYear();
                            setYear(selectedYear);
                        }} 
                    />
                )}
                {periodo === 'interval' && (
                    <RangePicker 
                        onChange={(dates) => {
                            const startDate = new Date(dates[0]);
                            const endDate = new Date(dates[1]);
                            const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
                            const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
                            setStartDate(formattedStartDate);
                            setEndDate(formattedEndDate);
                        }}
                    />
                )}
            </Form.Item>

            <Form.Item> 
                <Button 
                    type="primary" 
                    onClick={async () => {
                        await handleGetCommits()
                    }}
                >
                    Filtrar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormBuscarCommits;
