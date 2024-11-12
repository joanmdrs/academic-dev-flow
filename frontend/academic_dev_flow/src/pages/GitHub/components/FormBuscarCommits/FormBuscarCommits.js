import { Form, Select, DatePicker, Button } from "antd";
import React, { useEffect, useState } from "react";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { useContextoCommits } from "../../context/ContextoCommits";
import { filtrarCommitsPorPeriodoEUsuario } from "../../../../services/githubIntegration/commitService";
import { NotificationManager } from "react-notifications";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { FaArrowRotateRight, FaFilter } from "react-icons/fa6";

const { RangePicker } = DatePicker;

const FormBuscarCommits = () => {
    const { dadosProjeto } = useContextoGlobalProjeto();
    const { setCommits, setLoading } = useContextoCommits();
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [assignee, setAssignee] = useState(null);
    const [periodo, setPeriodo] = useState(null);
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [form] = Form.useForm();

    const optionsFiltro = [
        { value: 'day', label: 'Dia' },
        { value: 'month', label: 'Mês' },
        { value: 'year', label: 'Ano' },
        { value: 'interval', label: 'Intervalo' }
    ];

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
            handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    const handleGetCommits = async () => {
        setLoading(true);

        NotificationManager.info('Esta ação pode demorar um pouco, dependendo do volume de dados. Aguarde!');

        try {
            const parametros = {
                github_token: dadosProjeto.token,
                repository: dadosProjeto.nome_repo,
                username: assignee,
                period: periodo,
                day,
                month,
                year,
                start_date: startDate,
                end_date: endDate,
            };

            console.log(parametros)

            const response = await filtrarCommitsPorPeriodoEUsuario(parametros);

            if (!response.error && response.data.length > 0) {
                setCommits(response.data);
            }
        } catch (error) {
            handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        } finally {
            setLoading(false);
        }
    };

    const handleResetar = () => {
        form.resetFields()
        setCommits([])
        setAssignee(null)

    }

    useEffect(() => {
        if (dadosProjeto) handleGetMembros();
    }, [dadosProjeto]);

    return (
        <Form
            form={form}
            onFinish={handleGetCommits}
            style={{display: 'flex', justifyContent: 'space-between'}}
        >
            <div style={{display: 'flex', gap: '10px'}}>
                <Form.Item name="assignee">
                    <Select
                        popupMatchSelectWidth={false}
                        allowClear
                        placeholder="Membro"
                        options={optionsMembros}
                        onChange={(value) => {
                            if (value){
                                const selectedOption = optionsMembros.find((option) => option.value === value);
                                if (selectedOption && selectedOption.user) {
                                    setAssignee(selectedOption.user);
                                } else {
                                    NotificationManager.warning("O membro selecionado não possui um usuário GitHub associado.");
                                    setAssignee(null);
                                }
                            } else {
                                setAssignee(null)
                            }
                            
                        }}
                    />
                </Form.Item>

                <Form.Item name="periodo" rules={[{ required: true, message: "Selecione um período" }]}>
                    <Select
                        popupMatchSelectWidth={false}
                        allowClear
                        onChange={(value) => setPeriodo(value)}
                        options={optionsFiltro}
                        placeholder="Período"
                    />
                </Form.Item>

                { form.getFieldValue('periodo') && (
                    <Form.Item
                        name="data"
                        rules={[
                            { required: true, message: "Selecione uma data" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!periodo || value) return Promise.resolve();
                                    return Promise.reject(new Error("Selecione uma data válida para o período escolhido"));
                                },
                            }),
                        ]}
                    >
                        {periodo === 'day' && (
                            <DatePicker
                                picker="date"
                                onChange={(date) => {
                                    const formattedDate = date?.format("YYYY-MM-DD");
                                    setDay(formattedDate);
                                }}
                            />
                        )}
                        {periodo === 'month' && (
                            <DatePicker
                                picker="month"
                                onChange={(date) => {
                                    setMonth(date?.month() + 1);
                                    setYear(date?.year());
                                }}
                            />
                        )}
                        {periodo === 'year' && (
                            <DatePicker
                                picker="year"
                                onChange={(date) => setYear(date?.year())}
                            />
                        )}
                        {periodo === 'interval' && (
                            <RangePicker
                                onChange={(dates) => {
                                    setStartDate(dates?.[0]?.format("YYYY-MM-DD"));
                                    setEndDate(dates?.[1]?.format("YYYY-MM-DD"));
                                }}
                            />
                        )}
                    </Form.Item>

                )}

                
                <Button icon={<FaFilter />} type="primary" htmlType="submit">
                    Filtrar
                </Button>

            </div>

            <Button type="primary" ghost icon={<FaArrowRotateRight />} onClick={() => handleResetar()}> Resetar </Button>
            

           
        </Form>
    );
};

export default FormBuscarCommits;
