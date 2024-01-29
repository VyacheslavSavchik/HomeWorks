import React, {useEffect, useState} from 'react'
import s2 from "../../../../hws2-master/src/s1-main/App.module.css"
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = async (params: ParamsType) => {
        try{
            setLoading(true)
            //getTechs(params)
            const res = await getTechs(params)
            res && setTechs(res.data.techs)
            setLoading(false)
        } catch (e: any) {
            console.log(e.response?.data?.errorText || e.message)
        }


                // делает студент

                // сохранить пришедшие данные

                //

    }

    const onChangePagination = (newPage: number, newCount: number) => {
        // делает студент
        // setPage(
        setPage(newPage)
        // setCount(
        setCount(newCount)
        // sendQuery(
        // setSearchParams(
        sendQuery({page: newPage, count: newCount, sort: sort})
        const newSearchParams = new URLSearchParams();
        newSearchParams.set('page', `${newPage}`);
        newSearchParams.set('count', `${newCount}`);
        newSearchParams.set('sort', sort);
        setSearchParams(newSearchParams)
        //
    }

    const onChangeSort = (newSort: string) => {
        // делает студент
        setSort(newSort)
        setPage(1)
        // setSort(
        // setPage(1) // при сортировке сбрасывать на 1 страницу
        sendQuery({sort: newSort, count: count, page: 1})
        const newSearchParams = new URLSearchParams();
        newSearchParams.set('page', `${page}`);
        newSearchParams.set('count', `${count}`);
        newSearchParams.set('sort', newSort);
        setSearchParams(newSearchParams)

        // sendQuery(
        // setSearchParams(

        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        const a = params.page ? Number(params.page) : 1;
        const b = params.count ? Number(params.count) : 4;
        const s = params.sort ? params.sort : '';
        sendQuery({page: a, count: b, sort: s})
        setPage(a)
        setCount(b)
        setSort(s)
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))

    return (
        <div id={'hw15'}>
            <div className={s2.hwTitle}>Homework #15</div>

            <div className={s2.hw}>
                {idLoading && <div id={'hw15-loading'} className={s.loading}>Loading...</div>}

                <SuperPagination
                    page={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        tech
                        <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>
                    </div>

                    <div className={s.developerHeader}>
                        developer
                        <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                    </div>
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15
