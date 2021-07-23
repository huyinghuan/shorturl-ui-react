import ShortList from "@components/short-list"
import { useAppDispatch } from '@src/hook'
import { loadOwnerList } from "@store/short-slice"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
export default function URLList() {
    const { shortType, owner } = useParams<{ shortType: string, owner: string }>();
    const dispatch = useAppDispatch()
    console.log(shortType, owner)
    useEffect(() => {
        dispatch(loadOwnerList(shortType, owner))
    }, [shortType, owner, dispatch])
    return (
        <ShortList />
    )
}